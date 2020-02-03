import React, { useState } from 'react'
import classnames from 'classnames'
import { UserAvatar, CollapsedAvatars } from 'components'
import { withStyles, Grid, Hidden, Typography } from '@material-ui/core'
import BookmarkButton from '../BookmarkButton'
import useKnowledgeTypes from '../../hooks/useKnowledgeTypes'
import { constructImageUrl } from '../../utils/image'
import PublishDate from './PublishDate'
import ReadTime from './ReadTime'
import Taxonomies from './Taxonomies'

const ContentMetadata = ({ classes, content }) => {
  const [avatarsOpen, setAvatarsOpen] = useState(false)

  const users = content.authors.map(({ author }) => {
    return {
      picture: constructImageUrl(author.avatar),
      firstName: author.first_name,
      lastName: author.last_name,
      ...author,
      title: author.title || 'EFQM Member',
    }
  })

  const knowledgeTypes = useKnowledgeTypes()
  const taxonomyIds = content.taxonomy_items.map(
    ({ taxonomy_id: taxonomyId }) => taxonomyId
  )

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
      <Hidden only="xs" implementation="css">
        <Grid item sm={12}>
          <div className={classes.spacerBar} />
        </Grid>
      </Hidden>
      <Grid item xs={12}>
        {users.length > 1 && (
          <Hidden smUp implementation="css">
            <CollapsedAvatars
              users={users}
              label="Multiple authors"
              isOpen={avatarsOpen}
              onClick={isOpen => setAvatarsOpen(isOpen)}
            />
          </Hidden>
        )}
        {users.map(user => (
          <div
            key={user.id}
            className={classnames(
              { [classes.xsHidden]: users.length > 1 ? !avatarsOpen : false },
              classes.listedUser
            )}
          >
            <UserAvatar user={user} />
          </div>
        ))}
      </Grid>
      <Grid item xs={5} sm={12}>
        {content.published_at && <PublishDate date={content.published_at} />}
      </Grid>
      <Grid item xs={5} sm={12}>
        {content.fields && <ReadTime fields={content.fields} />}
      </Grid>
      <Grid item xs={2} sm={12}>
        <BookmarkButton
          articleId={content.id}
          className={classes.bookmarkButton}
          disabled={content.status !== 'published'}
        />
      </Grid>
      <Grid item xs={12}>
        <Taxonomies taxonomyIds={taxonomyIds} />
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
  bookmarkButton: {
    marginLeft: theme.spacing(1) * -1 - 2,
    marginTop: theme.spacing(1) * -1,
  },
  knowledgeType: {
    color: theme.palette.primary.dark,
  },
  listedUser: {
    marginBottom: theme.spacing(1),
  },
  xsHidden: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}))(ContentMetadata)
