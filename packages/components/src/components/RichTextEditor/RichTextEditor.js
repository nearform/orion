import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import { fade } from '@material-ui/core/styles/colorManipulator'

let CKEditor
let InlineEditor

if (typeof window !== 'undefined') {
  CKEditor = require('@ckeditor/ckeditor5-react')
  InlineEditor = require('@ckeditor/ckeditor5-build-inline')
}

const defaultConfig = {
  removePlugins: ['Table', 'MediaEmbed'],
  heading: {
    options: [
      { model: 'paragraph', title: 'Body Text' },
      { model: 'heading3', view: 'h3', title: 'Heading 3' },
      { model: 'heading4', view: 'h4', title: 'Heading 4' },
    ],
  },
}

const RichTextEditor = ({
  classes,
  data,
  config = {},
  onChange = () => null,
}) => {
  const [, setEditor] = useState()

  if (!CKEditor || !InlineEditor) return null
  return (
    <div className={classes.editor}>
      <CKEditor
        editor={InlineEditor}
        data={data}
        config={{ ...defaultConfig, ...config }}
        onInit={editor => {
          setEditor(editor)
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
          onChange(data)
        }}
      />
    </div>
  )
}

RichTextEditor.propTypes = {
  data: PropTypes.any,
  config: PropTypes.object,
  classes: PropTypes.object,
  onChange: PropTypes.func,
}

const styles = theme => ({
  '@global': {
    '.ck.ck-content': {
      backgroundColor: fade(theme.articleTypography.input.backgroundColor, 0.5),
      // Border: 0,
      padding: '9px 14px',
      '& > :first-child': {
        marginTop: '2px',
      },
      // By default heading 1 maps to h2, heading 2 to h3 etc (but we've customised this to map correctly)
      // see - https://ckeditor.com/docs/ckeditor5/latest/features/headings.html#heading-levels
      // heading 1 and 2 reseved for title and subtitle
      '& h3': theme.articleTypography.heading3,
      '& h4': theme.articleTypography.heading4,
      '& > p:first-of-type': theme.articleTypography.firstParagraph,
      '& p': theme.articleTypography.paragraph,
      '& ul': theme.articleTypography.bulletedList,
      '& ul li': theme.articleTypography.bulletedListItem,
      '& ol': theme.articleTypography.numberedList,
      '& ol li': theme.articleTypography.numberedListItem,
      '& blockquote': theme.articleTypography.blockquote,
      '& strong': theme.articleTypography.bold,
      '& i': theme.articleTypography.italic,
      '& a': theme.articleTypography.link,
    },
    '.ck.ck-balloon-panel': {
      backgroundColor: theme.articleTypography.input.backgroundColor,
      border: 'none',
      boxShadow: '0 2px 10px 0 rgba(0,0,0,0.1), 0 0 5px 0 rgba(0,0,0,0.1)',
      transform: 'translateY(-4px)',
    },
    '.ck-rounded-corners .ck.ck-balloon-panel, .ck.ck-balloon-panel.ck-rounded-corners': {
      borderRadius: '5px',
    },
    '.ck.ck-toolbar': {
      backgroundColor: theme.articleTypography.input.backgroundColor,
    },
  },
  editor: {
    flex: 1,
  },
})

export default withStyles(styles)(RichTextEditor)
