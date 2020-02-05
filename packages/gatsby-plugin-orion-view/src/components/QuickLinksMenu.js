import React, { useState, useRef } from 'react'
import { Button, Icon, Menu, MenuItem, withStyles } from '@material-ui/core'
import classnames from 'classnames'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'

export const QuickLinkButton = withStyles(theme => ({
  root: {
    color: theme.palette.primary.dark,
    borderRadius: 0,
    paddingLeft: theme.spacing(2),
    textTransform: 'uppercase',
  },
  menuDarkContrast: {
    color: theme.palette.background.paper,
  },
  menuOpen: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}))(
  React.forwardRef(({ dark, classes, open, ...props }, ref) => {
    const className = classnames({
      [classes.root]: true,
      [classes.menuOpen]: open,
      [classes.menuDarkContrast]: dark,
    })
    return <Button ref={ref} className={className} {...props} />
  })
)

const QuickLinksMenu = withStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.background.paper,
    textTransform: 'uppercase',
    borderRadius: 0,
  },
}))(
  React.forwardRef((props, ref) => (
    <Menu
      ref={ref}
      keepMounted
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))
)

export const QuickLinksMenuItem = withStyles(theme => ({
  root: {
    ...theme.typography.button,
    minHeight: theme.spacing(4),
    borderLeft: `${theme.spacing(0.5)}px solid transparent`,
    '&:hover, &:focus': {
      borderLeftColor: props =>
        props.borderColor || theme.palette.primary.light,
    },
  },
}))(React.forwardRef(({ borderColor, ...props }) => <MenuItem {...props} />))

function QuickLinkMenu({ dark, label, children }) {
  const menuButtonRef = useRef(null)
  const [open, setOpen] = useState(false)

  return (
    <>
      <QuickLinkButton
        ref={menuButtonRef}
        to="/admin"
        dark={dark}
        open={open}
        onClick={() => setOpen(!open)}
      >
        {label}
        <Icon
          color="secondary"
          component={KeyboardArrowDown}
          fontSize="large"
        />
      </QuickLinkButton>
      <QuickLinksMenu
        anchorEl={menuButtonRef.current}
        open={open}
        onClose={() => setOpen(false)}
      >
        {children}
      </QuickLinksMenu>
    </>
  )
}

export default QuickLinkMenu