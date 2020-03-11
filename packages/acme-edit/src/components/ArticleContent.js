import React from 'react'
import { Input, makeStyles } from '@material-ui/core'
import MarkdownEditor from 'gatsby-plugin-orion-edit/src/components/MarkdownEditor/MarkdownEditor'
import { createPropEditor } from 'gatsby-plugin-orion-edit'

const useStyles = makeStyles(theme => ({
  content: {
    '& h1': {
      ...theme.typography.h1,
      marginBottom: 16,
    },
    '& h2': {
      ...theme.typography.h2,
      marginBottom: 16,
    },
    '& h3': {
      ...theme.typography.h3,
      marginBottom: 16,
    },
    '& h4': {
      ...theme.typography.h4,
      marginBottom: 16,
    },
    '& h5': {
      ...theme.typography.h5,
      marginBottom: 16,
    },
    '& p': {
      ...theme.typography.body1,
      fontSize: '16px',
      lineHeight: '22px',
      marginBottom: 16,
      '&:first-of-type': {
        fontSize: '21px',
        lineHeight: '28px',
      },
    },
    '& li': {
      ...theme.typography.body1,
      fontSize: '16px',
      lineHeight: '22px',
      marginBottom: 16,
    },
    '& blockquote': {
      ...theme.typography.body1,
      alignItems: 'flex-start',
      display: 'flex',
      fontSize: '16px !important',
      fontStyle: 'italic',
      margin: 0,
      '&:before': {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 8,
        content: '""',
        display: 'block',
        height: 33,
        marginLeft: 16,
        marginRight: 16,
        width: 8,
      },
      '& *': {
        fontSize: '16px !important',
      },
    },
    '& ol': {
      counterReset: 'ol',
      listStyle: 'none',
      marginLeft: 16,
      padding: 0,
      '& li': {
        counterIncrement: 'ol',
        '&:before': {
          content: 'counter(ol) "."',
          marginRight: 16,
        },
      },
    },
  },
  image: {
    width: '100%',
    marginBottom: 16,
  },
  title: {
    ...theme.typography.h1,
    marginBottom: 16,
  },
  subtitle: {
    ...theme.typography.h2,
    marginBottom: 16,
  },
}))

function ArticleContentEditor({ content, image, onChange, page, subtitle }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Input
        fullWidth
        className={classes.title}
        value={page.title}
        onChange={event => {
          onChange(
            { content, image, subtitle },
            { ...page, title: event.target.value }
          )
        }}
      />
      <Input
        fullWidth
        className={classes.subtitle}
        value={subtitle}
        onChange={event => {
          onChange({ content, image, subtitle: event.target.value }, page)
        }}
      />
      {image && <img alt={page.title} src={image} className={classes.image} />}
      <div className={classes.content}>
        <MarkdownEditor
          content={content}
          onChange={value => {
            onChange({ content: value, image, subtitle }, page)
          }}
        />
      </div>
    </div>
  )
}

export default {
  editor: ArticleContentEditor,
  settings: createPropEditor({
    subtitle: {
      label: 'Subtitle',
      required: false,
      type: 'string',
    },
    image: {
      label: 'Image',
      required: false,
      type: 'string',
    },
    content: {
      label: 'Content',
      required: true,
      type: 'markdown',
    },
  }),
}
