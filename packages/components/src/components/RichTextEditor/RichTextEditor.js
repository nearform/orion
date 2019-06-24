import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'

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
  config = defaultConfig,
  onChange = () => null,
}) => {
  const [editor, setEditor] = useState()

  if (!CKEditor || !InlineEditor) return null

  return (
    <div className={classes.editor}>
      <CKEditor
        editor={InlineEditor}
        data={data}
        config={config}
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
      backgroundColor: 'rgb(243,245,248, 0.5)',
      // border: 0,
      padding: '9px 14px',
      '& > :first-child': {
        marginTop: '2px',
      },
      // by default heading 1 maps to h2, heading 2 to h3 etc (but we've customised this to map correctly)
      // see - https://ckeditor.com/docs/ckeditor5/latest/features/headings.html#heading-levels
      // heading 1 and 2 reseved for title and subtitle
      '& h3': theme.articleTypograpghy.heading3,
      '& h4': theme.articleTypograpghy.heading4,
      '& > p:first-of-type': theme.articleTypograpghy.firstParagraph,
      '& p': theme.articleTypograpghy.paragraph,
      '& ul': theme.articleTypograpghy.bulletedList,
      '& ul li': theme.articleTypograpghy.bulletedListItem,
      '& ol': theme.articleTypograpghy.numberedList,
      '& ol li': theme.articleTypograpghy.numberedListItem,
      '& blockquote': theme.articleTypograpghy.blockquote,
      '& strong': theme.articleTypograpghy.bold,
      '& i': theme.articleTypograpghy.italic,
      '& a': theme.articleTypograpghy.link,
    },
    '.ck.ck-balloon-panel': {
      backgroundColor: 'rgb(243,245,248)',
      border: 'none',
      boxShadow: '0 2px 10px 0 rgba(0,0,0,0.1), 0 0 5px 0 rgba(0,0,0,0.1)',
      transform: 'translateY(-4px)',
    },
    '.ck-rounded-corners .ck.ck-balloon-panel, .ck.ck-balloon-panel.ck-rounded-corners': {
      borderRadius: '5px',
    },
    '.ck.ck-toolbar': {
      backgroundColor: 'rgb(243,245,248)',
    },
  },
  editor: {
    flex: 1,
  },
})

export default withStyles(styles)(RichTextEditor)
