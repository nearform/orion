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
    display: 'flex',
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

const ContentOptions = ({ classes, articleDetails, refetchArticle }) => {
  const isAdmin = useIsAdmin()
  const isPlatformGroup = useIsPlatformGroup()

  const canHideArticles = isAdmin && isPlatformGroup

  return (
    <div className={classes.wrapper}>
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
  classes: T.object.isRequired,
  articleDetails: T.object.isRequired,
  refetchArticle: T.func.isRequired,
}

export default withStyles(theme => ({
  wrapper: {
    // Balances buttons' click/hover highlight areas in layout
    marginLeft: theme.spacing(-1),
  },
}))(ContentOptions)
