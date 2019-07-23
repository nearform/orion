import { React } from 'react'
import { useQuery } from 'graphql-hooks'
import { getTaxonomyTypes, getArticleDetails } from '../queries'
import { UserAvatar } from 'components'
import {
  withStyles,
  Grid,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import get from 'lodash/get'

const ViewArticle = async ({ classes, contentId }) => {
  const { data: taxonomyData } = useQuery(getTaxonomyTypes)
  const taxonomyTypes = get(taxonomyData, 'taxonomy_type', [])

  const { data: articleData, refetch: refetchArticle } = useQuery(
    getArticleDetails,
    {
      variables: {
        id: contentId,
      },
    }
  )
  const articleDetails = get(articleData, 'articleDetails')
  await refetchArticle()

  //TODO: nicer loading indication
  if (!articleDetails || !taxonomyTypes) return null

  return (
    <>
      <Grid container spacing={7} className={classes.sidebar}>
        <Grid item xs={3}>
          <Grid
            container
            spacing={1}
            className={classes.knowledgeTypeContainer}
            justify="space-between"
          ></Grid>

          <Grid item>
            <ExpansionPanel expanded className={classes.expansionPanel}>
              <ExpansionPanelSummary
                className={classes.expansionSummary}
                IconButtonProps={{ size: 'small' }}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="h3">Author</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.expansionDetails}>
                <div>
                  {articleDetails.authors.map(({ author }) => (
                    <UserAvatar
                      key={author.id}
                      email={author.email || ''}
                      memberType="efqm member"
                    />
                  ))}
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            {taxonomyTypes.map(type => (
              <ExpansionPanel
                key={type.key}
                expanded
                className={classes.expansionPanel}
              >
                <ExpansionPanelSummary
                  className={classes.expansionSummary}
                  IconButtonProps={{ size: 'small' }}
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography variant="h3">{type.name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansionDetails}>
                  {type.taxonomy_items.map(item => (
                    <p key={item.key}>{item.name}</p>
                  ))}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <p>{articleDetails.title}</p>
          <p>{articleDetails.subtitle}</p>
          <div>
            <Typography
              color="secondary"
              variant="h4"
              className={classes.fieldLabel}
            >
              Summary
            </Typography>
            <p>{articleDetails.summary}</p>
          </div>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </>
  )
}

export default withStyles(theme => ({
  selectedContentType: {
    margin: 0,
  },
  titleInput: {
    '& input': {
      ...theme.articleTypography.heading1,
      '&::-webkit-input-placeholder': { color: theme.palette.primary.dark },
      '&::-moz-placeholder': { color: theme.palette.primary.dark },
      '&:-ms-input-placeholder': { color: theme.palette.primary.dark },
      margin: 0,
      padding: `${theme.spacing(0.5)}px 0px`,
    },
    '&>div': {
      backgroundColor: 'transparent',
    },
  },
  subtitleInput: {
    '&>div': {
      backgroundColor: 'transparent',
    },
    '& input': {
      ...theme.articleTypography.heading2,
      '&::-webkit-input-placeholder': { color: theme.palette.primary.dark },
      '&::-moz-placeholder': { color: theme.palette.primary.dark },
      '&:-ms-input-placeholder': { color: theme.palette.primary.dark },
      margin: 0,
      padding: `${theme.spacing(0.5)}px 0px`,
    },
    marginTop: theme.spacing(-0.5),
  },
  fieldLabel: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  spacer: {
    '&:before': {
      content: '""',
      display: 'block',
      height: theme.spacing(1),
      backgroundColor: theme.palette.primary.dark,
      width: '100%',
    },
  },
  knowledgeTypeContainer: {
    '&>*>*': {
      width: '100%',
      height: '100%',
      minWidth: 0,
    },
  },

  expansionPanel: {
    backgroundColor: theme.palette.background.light,
    marginTop: `${theme.spacing(2)}px !important`,
  },
  expansionSummary: {
    padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
    minHeight: '0 !important',
    '&>div:first-child': {
      margin: 0,
    },
    color: theme.articleTypography.heading3.color,
    '& svg': {
      color: theme.articleTypography.heading3.color,
    },
  },
  expansionDetails: {
    padding: theme.spacing(2),
    flexDirection: 'column',
    paddingTop: 0,
  },
}))(ViewArticle)
