import React, { useEffect, useState } from 'react'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ArrowRight from '@material-ui/icons/ArrowRight'
import Tree, { mutateTree, moveItemOnTree } from '@atlaskit/tree'
import classNames from 'classnames'
import { IconButton, makeStyles } from '@material-ui/core'
import { Link, useLocation } from '@reach/router'

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
  label: {
    color: theme.palette.common.white,
    flex: 1,
    overflow: 'hidden',
    '& a': {
      color: theme.palette.common.white,
      display: 'block',
      overflow: 'hidden',
      textDecoration: 'none',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
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

function TreeView({ data: initialData }) {
  const classes = useStyles()
  const [data, setData] = useState(initialData)
  const location = useLocation()

  useEffect(() => {
    setData(initialData)
  }, [initialData])

  const renderItem = ({ item, onCollapse, onExpand, provided, snapshot }) => {
    return (
      <div
        {...provided.draggableProps}
        ref={provided.innerRef}
        className={classNames({
          [classes.item]: true,
          [classes.dragging]: snapshot.isDragging,
          [classes.selected]: location.pathname === item.to,
        })}
      >
        <div {...provided.dragHandleProps} className={classes.icon}>
          <i className={item.iconClass} />
        </div>
        <div className={classes.label}>
          <Link to={item.to}>{item.title}</Link>
        </div>
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
  }

  const onExpand = itemId => {
    setData(mutateTree(data, itemId, { isExpanded: true }))
  }

  const onCollapse = itemId => {
    setData(mutateTree(data, itemId, { isExpanded: false }))
  }

  const onDragEnd = (source, destination) => {
    if (!destination) {
      return
    }

    const newParent = data.items[destination.parentId]

    if (!newParent.allowChildren) {
      return
    }

    setData(moveItemOnTree(data, source, destination))
  }

  return (
    <div className={classes.container}>
      <Tree
        isDragEnabled
        isNestingEnabled
        tree={data}
        renderItem={renderItem}
        onExpand={onExpand}
        onCollapse={onCollapse}
        onDragEnd={onDragEnd}
      />
    </div>
  )
}

export default TreeView
