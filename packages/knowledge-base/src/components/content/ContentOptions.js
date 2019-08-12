import React from 'react'
import T from 'prop-types'
import { withStyles, Button, Grid } from '@material-ui/core'
import { useIsAdmin, useIsPlatformGroup } from '../../utils/auth'
import PlaceholderIcon from '@material-ui/icons/MoreHoriz'

import HideButton from './HideButton'

// TODO: delete this placeholder component when each button is implemented
const PlaceholderButton = withStyles(theme => ({
  root: {
    cursor: 'default',
    display: 'flex',
    whiteSpace: 'initial',
    textAlign: 'left',
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

const ContentOptions = ({ classes, articleData, refetchArticle }) => {
  const isAdmin = useIsAdmin()
  const isPlatformGroup = useIsPlatformGroup()

  const { id, status } = articleData

  const canShowHideArticle =
    isAdmin && isPlatformGroup && ['published', 'hidden'].includes(status)
  const canEditArticles = isAdmin // TODO: check and implement this feature

  return (
    <Grid container spacing={2} className={classes.wrapper}>
      <Grid item xs={12} sm={6} lg={12}>
        <PlaceholderButton>Download PDF</PlaceholderButton>
      </Grid>
      <Grid item xs={12} sm={6} lg={12}>
        <PlaceholderButton>Print this page</PlaceholderButton>
      </Grid>
      <Grid item xs={12} sm={6} lg={12}>
        <PlaceholderButton>Share this article</PlaceholderButton>
      </Grid>
      <Grid item xs={12} sm={6} lg={12}>
        <PlaceholderButton>Rate this article</PlaceholderButton>
      </Grid>
      {canShowHideArticle && (
        <Grid item xs={12} sm={6} lg={12}>
          <HideButton
            status={status}
            articleId={id}
            refetchArticle={refetchArticle}
          />
        </Grid>
      )}
      {canEditArticles && (
        <Grid item xs={12} sm={6} lg={12}>
          <PlaceholderButton>Edit mode</PlaceholderButton>
        </Grid>
      )}
    </Grid>
  )
}

ContentOptions.propTypes = {
  classes: T.object.isRequired,
  articleData: T.object.isRequired,
  refetchArticle: T.func.isRequired,
}

export default withStyles(theme => ({
  wrapper: {
    marginTop: theme.spacing(1),
    // Balances buttons' click/hover highlight areas in layout
    marginLeft: theme.spacing(-1),
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(),
      marginBottom: theme.spacing(),
      paddingTop: theme.spacing(),
      paddingBottom: theme.spacing(),
      borderWidth: '2px',
      borderColor: theme.palette.background.light,
      borderTopStyle: 'solid',
      borderBottomStyle: 'solid',
    },
  },
}))(ContentOptions)
