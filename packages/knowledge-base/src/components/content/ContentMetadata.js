import React from 'react'
import { UserAvatar } from 'components'
import PublishDate from './PublishDate'
import ReadTime from './ReadTime'
import Taxonomies from './Taxonomies'
import BookmarkButton from '../BookmarkButton'
import { withStyles, Grid, Hidden, Typography } from '@material-ui/core'
import useKnowledgeTypes from '../../hooks/useKnowledgeTypes'

const ContentMetadata = ({ classes, content }) => {
  const knowledgeTypes = useKnowledgeTypes()
  const taxonomyIds = [
    ...content.taxonomy_items.map(({ taxonomy_id }) => taxonomy_id),
  ]
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" color="secondary">
          knowledge type
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" className={classes.knowledgeType}>
          {knowledgeTypes[content.knowledge_type]}
        </Typography>
      </Grid>
      <Hidden only="xs">
        <Grid item sm={12}>
          <div className={classes.spacerBar} />
        </Grid>
      </Hidden>
      <Grid item xs={12}>
        {content.authors.map(({ author }) => (
          // TODO: Collapse this on narrow view for multiple authors
          <div className={classes.listedUser} key={author.id}>
            <UserAvatar
              user={{
                firstName: author.first_name,
                lastName: author.last_name,
                ...author,
                title: author.title || 'EFQM Member',
              }}
            />
          </div>
        ))}
      </Grid>
      <Grid item xs={5} sm={12}>
        <PublishDate date={content.created_at} />
      </Grid>
      <Grid item xs={5} sm={12}>
        <ReadTime fields={content.fields} />
      </Grid>
      <Grid item xs={2} sm={12}>
        <BookmarkButton articleId={content.id} />
      </Grid>
      <Grid item xs={12}>
        <Taxonomies taxonomyIds={taxonomyIds} showAll={false} />
      </Grid>
    </Grid>
  )
}

export default withStyles(theme => ({
  spacerBar: {
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(),
      backgroundColor: theme.palette.primary.dark,
    },
  },
  knowledgeType: {
    color: theme.palette.primary.dark,
  },
  listedUser: {
    marginBottom: theme.spacing(1),
  },
}))(ContentMetadata)
