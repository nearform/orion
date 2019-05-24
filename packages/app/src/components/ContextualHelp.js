import React from 'react'
import T from 'prop-types'
import { withStyles, Tooltip } from '@material-ui/core'

const ContextualHelp = ({ classes, children, helpContent, ...rest }) => (
  <Tooltip
    data-testid="contextual-help"
    title={helpContent}
    classes={classes}
    {...rest}
  >
    {children}
  </Tooltip>
)

ContextualHelp.propTypes = {
  helpContent: T.string.isRequired,
}

const styles = theme => ({
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    ...theme.typography.body1,
  },
  popper: {
    opacity: 1,
  },
})

export default withStyles(styles)(ContextualHelp)
