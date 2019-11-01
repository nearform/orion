import React, { useContext } from 'react'
import T from 'prop-types'
import { withStyles, Button, Grid } from '@material-ui/core'
import { AuthContext } from 'components'
import RateArticle from './RateArticle'
import HideButton from './HideButton'
import { Share, Print, Edit } from '@material-ui/icons'
import { navigate } from '@reach/router'

const OptionsButton = withStyles(theme => ({
  root: {
    cursor: 'default',
    display: 'flex',
    whiteSpace: 'initial',
    textAlign: 'left',
    ...theme.typography.h4,
  },
  icon: {
    marginRight: theme.spacing(),
    color: theme.palette.text.secondary,
  },
}))(({ classes, children, ...rest }) => {
  return (
    <Button className={classes.root} {...rest}>
      {children}
    </Button>
  )
})

const ContentOptions = ({ classes, articleData, refetchArticle }) => {
  const { getUserTokenData } = useContext(AuthContext)
  const { isAdmin, isPlatformGroup } = getUserTokenData()

  const { id, status } = articleData

  const canShowHideArticle =
    isAdmin && isPlatformGroup && ['published', 'hidden'].includes(status)
  const canEditArticles = isAdmin // TODO: check and implement this feature

  return (
    <Grid
      id="content-options-footer"
      container
      spacing={2}
      className={classes.wrapper}
    >
      <Grid item xs={12} sm={6} lg={12}>
        <OptionsButton>
          <i className={classes.icons}>
            <Share />
          </i>
          Share this article
        </OptionsButton>
      </Grid>
      <Grid item xs={12} sm={6} lg={12}>
        <RateArticle id={articleData.id} content={articleData}></RateArticle>
      </Grid>
      {canShowHideArticle && (
        <Grid item xs={12} sm={6} lg={12}>
          <HideButton
            status={status}
            articleId={id}
            refetchArticle={refetchArticle}
          />
        </Grid>
      )}
      {canEditArticles && (
        <Grid item xs={12} sm={6} lg={12}>
          <OptionsButton
            onClick={() => {
              navigate(`/my-content/edit/${id}`)
            }}
          >
            <i className={classes.icons}>
              <Edit />
            </i>
            Edit mode
          </OptionsButton>
        </Grid>
      )}
      <Grid item xs={12} sm={6} lg={12}>
        <OptionsButton onClick={() => window.print()}>
          <i className={classes.icons}>
            <Print />
          </i>
          Print this page
        </OptionsButton>
      </Grid>
    </Grid>
  )
}

ContentOptions.propTypes = {
  classes: T.object.isRequired,
  articleData: T.object.isRequired,
  refetchArticle: T.func.isRequired,
}

export default withStyles(theme => ({
  wrapper: {
    marginTop: theme.spacing(1),
    // Balances buttons' click/hover highlight areas in layout
    marginLeft: theme.spacing(-1),
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(),
      marginBottom: theme.spacing(),
      paddingTop: theme.spacing(),
      paddingBottom: theme.spacing(),
      borderWidth: '2px',
      borderColor: theme.palette.background.light,
      borderTopStyle: 'solid',
      borderBottomStyle: 'solid',
    },
  },
  icons: {
    paddingRight: '15px',
    color: 'rgb(156,175,195)',
  },
}))(ContentOptions)
