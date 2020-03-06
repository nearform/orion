import React, { useState, useRef, useImperativeHandle } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ArrowRight from '@material-ui/icons/ArrowRight'
import clsx from 'clsx'

const TRANSPARENT = 'rgba(0,0,0,0)'
const useMenuItemStyles = makeStyles(theme => ({
  root: props => ({
    backgroundColor: props.open ? theme.palette.action.hover : TRANSPARENT,
  }),
}))

const NestedMenuItem = React.forwardRef(function(props, ref) {
  const {
    parentMenuOpen,
    label,
    rightIcon = <ArrowRight />,
    children,
    className,
    tabIndex: tabIndexProp,
    MenuProps = {},
    ContainerProps: ContainerPropsProp = {},
    ...MenuItemProps
  } = props

  const { ref: containerRefProp, ...ContainerProps } = ContainerPropsProp

  const menuItemRef = useRef(null)
  useImperativeHandle(ref, () => menuItemRef.current)

  const containerRef = useRef(null)
  useImperativeHandle(containerRefProp, () => containerRef.current)

  const menuContainerRef = useRef(null)

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)

  const handleMouseEnter = event => {
    setIsSubMenuOpen(true)

    if (ContainerProps?.onMouseEnter) {
      ContainerProps.onMouseEnter(event)
    }
  }

  const handleMouseLeave = event => {
    setIsSubMenuOpen(false)

    if (ContainerProps?.onMouseLeave) {
      ContainerProps.onMouseLeave(event)
    }
  }

  // Check if any immediate children are active
  const isSubmenuFocused = () => {
    const active =
      containerRef.current && containerRef.current.ownerDocument.activeElement
    const children =
      (menuContainerRef.current && menuContainerRef.current.children) || []
    for (const child of children) {
      if (child === active) {
        return true
      }
    }

    return false
  }

  const handleFocus = event => {
    if (event.target === containerRef.current) {
      setIsSubMenuOpen(true)
    }

    if (ContainerProps && ContainerProps.onFocus) {
      ContainerProps.onFocus(event)
    }
  }

  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      return
    }

    if (isSubmenuFocused()) {
      event.stopPropagation()
    }

    const active =
      containerRef.current && containerRef.current.ownerDocument.activeElement

    if (event.key === 'ArrowLeft' && isSubmenuFocused()) {
      if (containerRef.current) containerRef.current.focus()
    }

    if (
      event.key === 'ArrowRight' &&
      event.target === containerRef.current &&
      event.target === active
    ) {
      const firstChild = menuContainerRef.current?.children[0]
      if (firstChild) firstChild.focus()
    }
  }

  const open = isSubMenuOpen && parentMenuOpen
  const menuItemClasses = useMenuItemStyles({ open })

  let tabIndex = tabIndexProp || -1
  if (!props.disabled) {
    tabIndex = -1
  }

  return (
    <div
      {...ContainerProps}
      ref={containerRef}
      tabIndex={tabIndex}
      role="button"
      onFocus={handleFocus}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <MenuItem
        {...MenuItemProps}
        ref={menuItemRef}
        className={clsx(menuItemClasses.root, className)}
      >
        {label}
        {rightIcon}
      </MenuItem>
      <Menu
        // Set pointer events to 'none' to prevent the invisible Popover div
        // from capturing events for clicks and hovers
        disableAutoFocus
        disableEnforceFocus
        style={{ pointerEvents: 'none' }}
        anchorEl={menuItemRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={open}
        onClose={() => {
          setIsSubMenuOpen(false)
        }}
        {...MenuProps}
      >
        <div ref={menuContainerRef} style={{ pointerEvents: 'auto' }}>
          {children}
        </div>
      </Menu>
    </div>
  )
})

export default NestedMenuItem
