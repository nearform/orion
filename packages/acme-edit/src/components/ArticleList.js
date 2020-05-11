import React from 'react'
import ArticleList from 'gatsby-package-orion-view/src/components/ArticleList'
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

const ArticleListEditor = props => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ArticleList {...props} />
    </div>
  )
}

export default {
  editor: ArticleListEditor,
  preview: ArticleList,
  settings: createPropEditor({
    title: {
      label: 'Title',
      required: false,
      type: 'string',
    },
    type: {
      label: 'Type',
      options: ['highlights', 'grid', 'rows'],
      required: true,
      type: 'select',
    },
    clipImage: {
      label: 'Clip image?',
      required: true,
      type: 'boolean',
    },
    suppressImage: {
      label: 'Suppress image?',
      required: true,
      type: 'boolean',
    },
    suppressSummary: {
      label: 'Suppress summary?',
      required: true,
      type: 'boolean',
    },
    withFeatured: {
      label: 'With featured?',
      required: true,
      type: 'boolean',
    },
  }),
}
