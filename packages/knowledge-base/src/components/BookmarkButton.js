import React from 'react'
import T from 'prop-types'
import { useMutation } from 'graphql-hooks'
import classnames from 'classnames'
import { BookmarkOutlined, BookmarkBorderOutlined } from '@material-ui/icons'
import { withStyles, Button, CircularProgress } from '@material-ui/core'
import { addUserBookmarkMutation, deleteUserBookmarkMutation } from '../queries'
import { useUserId } from '../utils/auth'
import useBookmarkData from '../hooks/useBookmarkData'

const BookmarkButton = ({
  articleId,
  bookmarked,
  disabled,
  onToggle,
  classes,
}) => {
  const userId = useUserId()
  if (!disabled || !onToggle) {
    const {
      articleBookmarked,
      refetchArticleBookmarked,
      loadingBookmarked,
    } = useBookmarkData(articleId)
    bookmarked = articleBookmarked
    disabled = loadingBookmarked
    onToggle = refetchArticleBookmarked
  }

  const [bookmarkArticle, { loading: bookmarking }] = useMutation(
    addUserBookmarkMutation
  )
  const [unbookmarkArticle, { loading: unbookmarking }] = useMutation(
    deleteUserBookmarkMutation
  )

  const BookmarkIcon = bookmarked ? BookmarkOutlined : BookmarkBorderOutlined

  const toggleBookmark = async () => {
    const toggleBookmark = bookmarked ? unbookmarkArticle : bookmarkArticle

    await toggleBookmark({
      variables: {
        userId,
        articleId,
      },
    })
    onToggle && onToggle()
  }

  const loading = bookmarking || unbookmarking

  return (
    <Button
      size="small"
      color="primary"
      className={classes.iconButtonPrimary}
      disabled={disabled || loading}
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
      {bookmarked ? 'Bookmarked' : 'Bookmark'}
    </Button>
  )
}

BookmarkButton.propTypes = {
  articleId: T.number.isRequired,
  bookmarked: T.bool,
  classes: T.object.isRequired,
  disabled: T.bool,
  onToggle: T.func,
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
