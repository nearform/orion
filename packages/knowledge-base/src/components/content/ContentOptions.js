import React from 'react'
import T from 'prop-types'
import { withStyles, Typography } from '@material-ui/core'
import { useIsAdmin, useIsPlatformGroup } from '../../utils/auth'

import HideButton from './HideButton'

const ContentOptions = ({ classes, articleDetails }) => {
  const isAdmin = useIsAdmin()
  const isPlatformGroup = useIsPlatformGroup()

  const canHideArticles = isAdmin && isPlatformGroup

  return (
    <div className={classes.wrapper}>
      <Typography variant="h4">Download PDF</Typography>
      <Typography variant="h4">Print this page</Typography>
      <Typography variant="h4">Share this article</Typography>
      <Typography variant="h4">Rate this article</Typography>
      {canHideArticles && (
        <HideButton
          status={articleDetails.status}
          articleId={articleDetails.id}
        />
      )}
    </div>
  )
}

ContentOptions.propTypes = {
  articleDetails: T.object.isRequired,
  classes: T.object.isRequired,
}

export default withStyles(theme => ({
  wrapper: {
    '&>*': {
      margin: theme.spacing(2, 0),
    },
  },
}))(ContentOptions)
