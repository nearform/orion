import React from 'react'
import T from 'prop-types'
import { useQuery, useMutation } from 'graphql-hooks'
import classnames from 'classnames'
import { BookmarkOutlined, BookmarkBorderOutlined } from '@material-ui/icons'
import { withStyles, Button, CircularProgress } from '@material-ui/core'
import {
  getArticleBookmarked,
  addUserBookmarkMutation,
  deleteUserBookmarkMutation,
} from '../queries'
import { useUserId } from '../utils/auth'
import get from 'lodash/get'

const BookmarkButton = ({ articleId, classes }) => {
  const userId = useUserId()

  const {
    data: articleBookmarkedData,
    refetch: refetchArticleBookmarked,
    loading: loadingBookmarked,
  } = useQuery(getArticleBookmarked, {
    variables: {
      articleId: articleId,
      userId,
    },
  })

  const articleBookmarked =
    get(articleBookmarkedData, 'bookmarked_aggregate.aggregate.count') > 0

  const [bookmarkArticle, { loading: bookmarking }] = useMutation(
    addUserBookmarkMutation
  )
  const [unbookmarkArticle, { loading: unbookmarking }] = useMutation(
    deleteUserBookmarkMutation
  )

  const BookmarkIcon = articleBookmarked
    ? BookmarkOutlined
    : BookmarkBorderOutlined

  const toggleBookmark = async () => {
    const toggleBookmark = articleBookmarked
      ? unbookmarkArticle
      : bookmarkArticle

    await toggleBookmark({
      variables: {
        userId,
        articleId,
      },
    })
    refetchArticleBookmarked && refetchArticleBookmarked()
  }

  const loading = bookmarking || unbookmarking

  return (
    <Button
      size="small"
      color="primary"
      className={classes.iconButtonPrimary}
      disabled={loadingBookmarked || loading}
      onClick={toggleBookmark}
    >
      {loading ? (
        <CircularProgress
          color="secondary"
          size={24}
          className={classes.sidebarButtonIcon}
        />
      ) : (
        <BookmarkIcon
          className={classnames([
            classes.sidebarButtonIcon,
            classes.secondaryIcon,
          ])}
        />
      )}
      {articleBookmarked ? 'Bookmarked' : 'Bookmark'}
    </Button>
  )
}

BookmarkButton.propTypes = {
  articleId: T.number.isRequired,
  classes: T.object.isRequired,
}

export default withStyles(theme => ({
  iconButtonPrimary: {
    color: theme.bookmarkButtonColor,
    padding: '0px',
    fontWeight: 'bold',
  },
  sidebarButtonIcon: {
    marginRight: theme.spacing(1),
  },
  secondaryIcon: {
    color: theme.palette.secondary.main,
  },
}))(BookmarkButton)
