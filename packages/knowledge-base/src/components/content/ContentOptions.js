import React from 'react'
import T from 'prop-types'
import { withStyles, Button } from '@material-ui/core'
import { useIsAdmin, useIsPlatformGroup } from '../../utils/auth'
import PlaceholderIcon from '@material-ui/icons/MoreHoriz'

import HideButton from './HideButton'

// TODO: delete this placeholder component when each button is implemented
const PlaceholderButton = withStyles(theme => ({
  root: {
    cursor: 'default',
    ...theme.typography.h4,
  },
  icon: {
    marginRight: theme.spacing(),
    color: theme.palette.text.secondary,
  },
}))(({ classes, children }) => {
  return (
    <Button className={classes.root}>
      <PlaceholderIcon className={classes.icon} />
      {children}
    </Button>
  )
})

const ContentOptions = ({ articleDetails, refetchArticle }) => {
  const isAdmin = useIsAdmin()
  const isPlatformGroup = useIsPlatformGroup()

  const canHideArticles = isAdmin && isPlatformGroup

  return (
    <div>
      <PlaceholderButton>Download PDF</PlaceholderButton>
      <PlaceholderButton>Print this page</PlaceholderButton>
      <PlaceholderButton>Share this article</PlaceholderButton>
      <PlaceholderButton>Rate this article</PlaceholderButton>
      {canHideArticles && (
        <HideButton
          status={articleDetails.status}
          articleId={articleDetails.id}
          refetchArticle={refetchArticle}
        />
      )}
    </div>
  )
}

ContentOptions.propTypes = {
  articleDetails: T.object.isRequired,
  refetchArticle: T.func.isRequired,
}

export default ContentOptions
