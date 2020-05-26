import React from 'react'
import ArticleContent from 'gatsby-plugin-orion-view/src/components/ArticleContent/Wrap'
import MarkdownEditor from './MarkdownEditor/MarkdownEditor'
import { Input, makeStyles, InputBase, Paper } from '@material-ui/core'
import createPropEditor from './PropEditor'
import TagsSelect from './TagsSelect'
import CloudinaryImageChooser from 'gatsby-plugin-orion-core/src/components/CloudinaryImageChooser'
import getCloudinarySignature from 'gatsby-plugin-orion-core/src/utils/cloudinary-signature-from-auth'

const useStyles = makeStyles(theme => ({
  root: {
    border: `1px dashed ${theme.palette.common.black}`,
    margin: '-16px 0 0 -16px',
    padding: '36px 16px 16px',
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
  imageInputPaper: {
    display: 'flex',
    marginBottom: 16,
    paddingBottom: 8.5,
    paddingTop: 7.5,
    paddingLeft: 12,
    border: 'solid 1px',
    borderColor: theme.palette.tertiary.main,
    backgroundColor: theme.palette.background.dark,
    boxShadow: 'none',
  },
  imageInputBase: {
    fontSize: 12,
    flex: 1,
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
      <Paper className={classes.imageInputPaper}>
        <InputBase
          className={classes.imageInputBase}
          value={image}
          onChange={event => {
            onChange({ content, image: event.target.value, subtitle }, page)
          }}
        />
        <CloudinaryImageChooser
          cloudinaryApiKey={process.env.GATSBY_CLOUDINARY_API_KEY}
          cloudinaryCloudName={process.env.GATSBY_CLOUDINARY_CLOUD_NAME}
          cloudinaryUsername={process.env.GATSBY_CLOUDINARY_USERNAME}
          getCloudinarySignature={getCloudinarySignature}
          onInsertedImage={imgUrl =>
            onChange({ content, image: imgUrl, subtitle }, page)
          }
        />
      </Paper>
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
