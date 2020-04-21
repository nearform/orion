import React from 'react'
import ArticleMetadata from 'acme-view/src/components/ArticleMetadata/Wrap'
import { createPropEditor } from 'gatsby-plugin-orion-edit'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 'auto',
    border: `1px dashed ${theme.palette.common.black}`,
    margin: '-16px 0 0 -16px',
    padding: 16,
    width: 'calc(100% + 32px)',
    height: '100%',
  },
}))

const ArticleMetadataEditor = props => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ArticleMetadata {...props} />
    </div>
  )
}

export default {
  editor: ArticleMetadataEditor,
  preview: ArticleMetadata,
  settings: createPropEditor({
    readTime: {
      label: 'Read time',
      required: true,
      type: 'number',
    },
  }),
}
