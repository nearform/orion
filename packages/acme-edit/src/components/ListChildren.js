import React from 'react'
import ListChildren from 'acme-view/src/components/ListChildren'
import { createPropEditor } from 'gatsby-plugin-orion-edit'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    border: `1px dashed ${theme.palette.common.black}`,
    margin: '-16px 0 0 -16px',
    padding: '36px 16px 16px',
    width: 'calc(100% + 32px)',
    height: '100%',
  },
}))

const ListChildrenEditor = props => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ListChildren {...props} />
    </div>
  )
}

export default {
  editor: ListChildrenEditor,
  preview: ListChildren,
  settings: createPropEditor({}),
}
