import React from 'react'
import { withStyles, Chip } from '@material-ui/core'
import T from 'prop-types'
import { fade } from '@material-ui/core/styles/colorManipulator'

function StatusChip({
  children,
  classes,
  chipColor,
  IconComponent,
  iconColor,
}) {
  return (
    <Chip
      classes={classes}
      label={
        <>
          {children}
          {IconComponent && (
            <IconComponent fontSize="small" color={iconColor} />
          )}
        </>
      }
      color={chipColor}
    />
  )
}

StatusChip.propTypes = {
  children: T.node.isRequired,
  classes: T.object.isRequired,
  chipColor: T.string.isRequired,
  IconComponent: T.elementType,
  iconColor: T.string,
}

const styles = theme => ({
  root: {
    height: 'auto',
    backgroundColor: fade(theme.palette.primary.dark, 0.1),
    color: theme.palette.text.primary,
  },
  colorPrimary: {
    backgroundColor: fade(theme.palette.primary.light, 0.1),
  },
  colorSecondary: {
    backgroundColor: fade(theme.palette.secondary.dark, 0.1),
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    '& > * + * ': {
      marginLeft: theme.spacing(1),
    },
  },
})

export default withStyles(styles)(StatusChip)
