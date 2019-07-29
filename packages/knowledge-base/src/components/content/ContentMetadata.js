import React from 'react'
import { useQuery } from 'graphql-hooks'
import { getTaxonomyTypes, getArticleBookmarked } from '../../queries'
import { UserAvatar } from 'components'
import PublishDate from './PublishDate'
import ReadTime from './ReadTime'
import BookmarkButton from '../BookmarkButton'
import { useUserId } from '../../utils/auth'
import { withStyles, Typography } from '@material-ui/core'
import { BookmarkOutlined } from '@material-ui/icons'
import get from 'lodash/get'

const ContentMetadata = ({ classes, content }) => {
  const { data: taxonomyData } = useQuery(getTaxonomyTypes)
  const taxonomyTypes = get(taxonomyData, 'taxonomy_type', [])

  const userId = useUserId()

  const {
    data: articleBookmarkedData,
    refetch: refetchArticleBookmarked,
    loading: loadingBookmarked,
  } = useQuery(getArticleBookmarked, {
    variables: {
      articleId: content.id,
      userId,
    },
  })

  const articleBookmarked =
    get(articleBookmarkedData, 'bookmarked_aggregate.aggregate.count') > 0

  //TODO: nicer loading indication
  if (!taxonomyTypes) return null

  return (
    <div className={classes.wrapper}>
      <Typography variant="h4" color="secondary">
        knowledge type
      </Typography>
      <Typography variant="h3">{content.knowledge_type}</Typography>
      <div className={classes.spacerBar} />
      {content.authors.map(({ author }) => (
        <UserAvatar
          key={author.id}
          user={{
            firstName: author.first_name,
            lastName: author.last_name,
            ...author,
            title: 'efqm member',
          }}
        />
      ))}
      <PublishDate date={content.created_at} />
      <ReadTime fields={content.fields} />
      <BookmarkButton
        articleId={content.contentId}
        bookmarked={articleBookmarked}
        disabled={loadingBookmarked}
        onToggle={refetchArticleBookmarked}
      />
      <Typography variant="h4">
        <BookmarkOutlined fontSize="small" />
        Bookmark
      </Typography>
      {taxonomyTypes.map(type => (
        <Typography key={type.name} variant="h3">
          {type.name}
        </Typography>
      ))}
    </div>
  )
}

export default withStyles(theme => ({
  spacerBar: {
    display: 'block',
    width: '264px',
    height: '8px',
    backgroundColor: theme.palette.primary.dark,
  },
  wrapper: {
    width: '304px',
    '&>*': {
      margin: '16px',
    },
  },
}))(ContentMetadata)
