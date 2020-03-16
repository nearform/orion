import React, {
  Children,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Menu, MenuItem, makeStyles } from '@material-ui/core'
import ArrowRight from '@material-ui/icons/ArrowRight'
import clsx from 'clsx'

const TRANSPARENT = 'rgba(0, 0, 0, 0)'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: ({ open }) =>
      open ? theme.palette.action.hover : TRANSPARENT,
    textTransform: 'capitalize',
  },
  menu: {
    pointerEvents: 'none',
  },
}))

const NestedMenuItem = React.forwardRef(
  (
    {
      parentMenuOpen,
      label,
      children,
      className,
      disabled,
      tabIndex,
      MenuProps = {},
      ContainerProps: { ref: containerRefProp, ...ContainerProps } = {},
      ...MenuItemProps
    },
    ref
  ) => {
    const menuItemRef = useRef(null)
    const containerRef = useRef(null)

    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)

    useImperativeHandle(ref, () => menuItemRef.current)
    useImperativeHandle(containerRefProp, () => containerRef.current)

    const handleMouseEnter = useCallback(
      event => {
        setIsSubMenuOpen(true)

        if (ContainerProps.onMouseEnter) {
          ContainerProps.onMouseEnter(event)
        }
      },
      [setIsSubMenuOpen, ContainerProps]
    )

    const handleMouseLeave = useCallback(
      event => {
        setIsSubMenuOpen(false)

        if (ContainerProps.onMouseLeave) {
          ContainerProps.onMouseLeave(event)
        }
      },
      [setIsSubMenuOpen, ContainerProps]
    )

    const handleClose = useCallback(() => {
      setIsSubMenuOpen(false)
    }, [setIsSubMenuOpen])

    const open = isSubMenuOpen && parentMenuOpen
    const classes = useStyles({ open })

    return (
      <div
        {...ContainerProps}
        ref={containerRef}
        tabIndex={disabled ? -1 : tabIndex || -1}
        role="button"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <MenuItem
          {...MenuItemProps}
          ref={menuItemRef}
          className={clsx(classes.root, className)}
        >
          {label}
          {Children.count(children) > 0 && <ArrowRight />}
        </MenuItem>
        {Children.count(children) > 0 && (
          <Menu
            disableAutoFocus
            disableEnforceFocus
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
            onClose={handleClose}
            {...MenuProps}
          >
            {children}
          </Menu>
        )}
      </div>
    )
  }
)

export default NestedMenuItem
