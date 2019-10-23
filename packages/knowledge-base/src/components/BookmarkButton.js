import React, { useContext, useEffect } from 'react'
import T from 'prop-types'
import { useMutation } from 'graphql-hooks'
import classnames from 'classnames'
import { AuthContext } from 'components'
import { BookmarkOutlined, BookmarkBorderOutlined } from '@material-ui/icons'
import {
  withStyles,
  Button,
  CircularProgress,
  Hidden,
  IconButton,
} from '@material-ui/core'
import { addUserBookmarkMutation, deleteUserBookmarkMutation } from '../queries'
import useBookmarkData from '../hooks/useBookmarkData'

const BookmarkButton = ({
  articleId,
  bookmarked: bookmarkedProp,
  disabled: disabledProp,
  onToggle: onToggleProp,
  compact,
  className,
  classes,
}) => {
  const { isAuthInitialized, getUserTokenData } = useContext(AuthContext)
  const { userId } = getUserTokenData()

  const {
    fetchArticleBookmarked,
    articleBookmarked,
    loadingBookmarked,
  } = useBookmarkData(articleId)

  useEffect(() => {
    if (bookmarkedProp === undefined && userId && isAuthInitialized) {
      fetchArticleBookmarked()
    }
  }, [bookmarkedProp, userId, isAuthInitialized, fetchArticleBookmarked])

  const bookmarked = bookmarkedProp || articleBookmarked
  const disabled = disabledProp || loadingBookmarked || !userId
  const onToggle = onToggleProp || fetchArticleBookmarked

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

  if (compact) {
    return (
      <IconButton
        size="small"
        color="primary"
        className={classnames([classes.iconButtonPrimary, className])}
        disabled={disabled || loading}
        onClick={toggleBookmark}
      >
        {loading ? (
          <CircularProgress color="secondary" size={24} />
        ) : (
          <BookmarkIcon className={classnames([classes.secondaryIcon])} />
        )}
      </IconButton>
    )
  }

  return (
    <Button
      size="small"
      color="primary"
      className={classnames([classes.iconButtonPrimary, className])}
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
      <Hidden only="xs">{bookmarked ? 'Bookmarked' : 'Bookmark'}</Hidden>
    </Button>
  )
}

BookmarkButton.propTypes = {
  articleId: T.number.isRequired,
  bookmarked: T.bool,
  classes: T.object.isRequired,
  disabled: T.bool,
  onToggle: T.func,
  compact: T.bool,
}

export default withStyles(theme => ({
  iconButtonPrimary: {
    color: theme.articleWidgetColor,
    fontWeight: 'bold',
  },
  sidebarButtonIcon: {
    marginRight: theme.spacing(1),
  },
  secondaryIcon: {
    color: theme.palette.secondary.main,
  },
}))(BookmarkButton)
