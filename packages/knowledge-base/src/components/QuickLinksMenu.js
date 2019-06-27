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
    return <Button className={className} ref={ref} {...props} />
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
      elevation={0}
      getContentAnchorEl={null}
      keepMounted
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      ref={ref}
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
      borderLeftColor: theme.palette.primary.light,
    },
  },
}))(MenuItem)

function QuickLinkMenu({ dark, label, children }) {
  const menuButtonRef = useRef(null)
  const [open, setOpen] = useState(false)

  return (
    <>
      <QuickLinkButton
        to="/admin"
        dark={dark}
        open={open}
        onClick={() => setOpen(!open)}
        ref={menuButtonRef}
      >
        {label}
        <Icon component={KeyboardArrowDown} color="secondary" />
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
