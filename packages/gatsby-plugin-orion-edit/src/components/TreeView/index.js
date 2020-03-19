import React, { useEffect, useRef, useState } from 'react'
import SortableTree from 'react-sortable-tree'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(0, 1),
    position: 'relative',
  },
  children: {

  },
  item: {
    alignItems: 'center',
    borderRadius: 3,
    display: 'flex',
    '& i': {
      color: theme.palette.common.white,
      display: 'flex',
      justifyContent: 'center',
      fontSize: 24,
      padding: theme.spacing(0, 1, 0, 2),
      width: 40,
    },
    '& a': {
      color: theme.palette.common.white,
      flex: 1,
      padding: theme.spacing(0, 2),
      fontSize: 16,
      fontWeight: 'bold',
      overflow: 'hidden',
      textDecoration: 'none',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  selected: {
    backgroundColor: fade(theme.palette.common.white, 0.25),
    '& i': {
      color: theme.palette.action.light,
    },
  },
  toggle: {
    alignItems: 'center',
    color: theme.palette.common.white,
    display: 'flex',
    padding: theme.spacing(1),
  },
}))

function TreeView({}) {
  return (
    <SortableTree
    />
  )
}

export default TreeView
