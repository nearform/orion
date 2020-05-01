import React, { useCallback } from 'react'
import T from 'prop-types'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ArrowRight from '@material-ui/icons/ArrowRight'
import Tree from '@atlaskit/tree'
import classNames from 'classnames'
import { IconButton, makeStyles } from '@material-ui/core'
import { useLocation } from '@reach/router'
import TreeViewLink from '../TreeViewLink'

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    width: '100%',
    '& > div': {
      height: '100%',
      width: '100%',
    },
  },
  item: {
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#2f4756',
    display: 'flex',
    height: 40,
    fontSize: 16,
    fontWeight: 'bold',
    margin: theme.spacing(0.5, 1),
    padding: theme.spacing(1, 0),
  },
  dragging: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    '& $icon': {
      color: theme.palette.action.light,
    },
  },
  icon: {
    color: theme.palette.tertiary.main,
    fontSize: 22,
    margin: theme.spacing(0, 2, 0, 1),
    textAlign: 'center',
    width: 34,
    '&:hover': {
      color: theme.palette.action.light,
    },
  },
  selected: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    '& $icon': {
      color: theme.palette.action.light,
    },
  },
  toggle: {
    color: theme.palette.common.white,
    marginLeft: theme.spacing(1),
  },
}))

function TreeView({
  isDragEnabled,
  isNestingEnabled,
  onCollapse,
  onDragEnd,
  onExpand,
  tree,
}) {
  const classes = useStyles()
  const location = useLocation()

  const renderItem = useCallback(
    ({ item, onCollapse, onExpand, provided, snapshot }) => {
      return (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={classNames(classes.item, {
            [classes.dragging]: snapshot.isDragging,
            [classes.selected]: location.pathname === item.to,
          })}
        >
          <div {...provided.dragHandleProps} className={classes.icon}>
            <i className={item.iconClass} />
          </div>
          <TreeViewLink
            to={item.to}
            title={item.title}
            pageId={item.id}
            showInMenu={item.showInMenu}
            layout={item.layout}
          />
          {item.children.length > 0 && (
            <IconButton
              className={classes.toggle}
              size="small"
              onClick={() => {
                if (item.isExpanded) {
                  onCollapse(item.id)
                } else {
                  onExpand(item.id)
                }
              }}
            >
              {item.isExpanded ? <ArrowDropDown /> : <ArrowRight />}
            </IconButton>
          )}
        </div>
      )
    },
    [
      classes.dragging,
      classes.icon,
      classes.item,
      classes.label,
      classes.selected,
      classes.toggle,
      location.pathname,
    ]
  )

  return (
    <div className={classes.container}>
      <Tree
        isDragEnabled={isDragEnabled}
        isNestingEnabled={isNestingEnabled}
        tree={tree}
        renderItem={renderItem}
        onCollapse={onCollapse}
        onDragEnd={onDragEnd}
        onExpand={onExpand}
      />
    </div>
  )
}

TreeView.defaultProps = {
  isDragEnabled: false,
  isNestingEnabled: false,
}

TreeView.propTypes = {
  isDragEnabled: T.bool,
  isNestingEnabled: T.bool,
  tree: T.shape({
    rootId: T.any.isRequired,
    items: T.objectOf(
      T.shape({
        id: T.any.isRequired,
        title: T.string.isRequired,
        allowChildren: T.bool,
        children: T.arrayOf(T.any).isRequired,
        iconClass: T.string,
        isExpanded: T.bool,
      })
    ).isRequired,
  }).isRequired,
  onCollapse: T.func.isRequired,
  onDragEnd: T.func.isRequired,
  onExpand: T.func.isRequired,
}

export default TreeView
