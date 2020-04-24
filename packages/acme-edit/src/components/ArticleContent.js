import React from 'react'
import ArticleContent from 'acme-view/src/components/ArticleContent/Wrap'
import MarkdownEditor from 'gatsby-plugin-orion-edit/src/components/MarkdownEditor/MarkdownEditor'
import { Input, makeStyles } from '@material-ui/core'
import { createPropEditor } from 'gatsby-plugin-orion-edit'
import TagsSelect from 'gatsby-plugin-orion-edit/src/components/TagsSelect'

const useStyles = makeStyles(theme => ({
  root: {
    border: '1px dashed black',
    margin: '-16px 0 0 -16px',
    padding: 16,
    width: 'calc(100% + 32px)',
  },
  content: {
    marginBottom: 16,

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
      <TagsSelect
        existingTags={page.allTags}
        currentTags={page.tags}
        onChange={tags => {
          onChange(
            { content, image, subtitle },
            {
              ...page,
              tags,
            }
          )
        }}
      />
    </div>
  )
}

export default {
  editor: ArticleContentEditor,
  preview: ArticleContent,
  settings: createPropEditor({
    subtitle: {
      label: 'Subtitle',
      required: false,
      type: 'string',
    },
    image: {
      label: 'Image',
      required: false,
      type: 'image',
    },
    tags: {
      label: 'Tags',
      required: false,
      type: 'tags',
    },
    content: {
      label: 'Content',
      required: true,
      type: 'markdown',
    },
  }),
}
