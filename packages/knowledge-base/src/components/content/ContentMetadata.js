import React, { useState } from 'react'
import classnames from 'classnames'
import { UserAvatar, CollapsedAvatars } from 'components'
import PublishDate from './PublishDate'
import ReadTime from './ReadTime'
import Taxonomies from './Taxonomies'
import BookmarkButton from '../BookmarkButton'
import { withStyles, Grid, Hidden, Typography } from '@material-ui/core'
import useKnowledgeTypes from '../../hooks/useKnowledgeTypes'
import { isAuthenticatedSync } from '../../utils/auth'
import { constructImageUrl } from '../../utils/image'

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
        {users.length > 1 && (
          <Hidden smUp>
            <CollapsedAvatars
              users={users}
              label="Multiple authors"
              onClick={isOpen => setAvatarsOpen(isOpen)}
              isOpen={avatarsOpen}
            />
          </Hidden>
        )}
        {users.map(user => (
          <div
            key={user.id}
            className={classnames(
              { [classes.xsHidden]: !avatarsOpen },
              classes.listedUser
            )}
          >
            <UserAvatar user={user} />
          </div>
        ))}
      </Grid>
      <Grid item xs={5} sm={12}>
        <PublishDate date={content.published_at} />
      </Grid>
      <Grid item xs={5} sm={12}>
        {content.fields && <ReadTime fields={content.fields} />}
      </Grid>
      <Grid item xs={2} sm={12}>
        {isAuthenticatedSync() && (
          <BookmarkButton
            articleId={content.id}
            className={classes.bookmarkButton}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        <Taxonomies items={content.taxonomy_items} />
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
