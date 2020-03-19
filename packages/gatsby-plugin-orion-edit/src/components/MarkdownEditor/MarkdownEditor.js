import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import ReactMde, { commands } from 'react-mde'
import ReactMarkdown from 'react-markdown'

// eslint-disable-next-line import/no-unassigned-import
import 'react-mde/lib/styles/css/react-mde-all.css'

const listCommands = [
  {
    commands: [
      commands.headerCommand,
      commands.boldCommand,
      commands.italicCommand,
      commands.linkCommand,
      commands.unorderedListCommand,
      commands.orderedListCommand,
      commands.imageCommand,
      commands.quoteCommand,
    ],
  },
]

const useStyles = makeStyles(theme => {
  return {
    container: {
      position: 'relative',
      paddingTop: 51,
      ...theme.typography.body1,
    },
    reactMde: {
      ...theme.typography.body1,
    },
    toolbar: {
      boxShadow: theme.shadows[2],
      backgroundColor: '#f3f5f8',
      border: 'none',
      borderRadius: theme.shape.borderRadius,
      padding: theme.shape.borderRadius,
      width: 'auto',
      position: 'absolute',
      top: 2,
      left: 0,
      zIndex: 1,
      ...theme.typography.body1,
    },
    preview: {
      backgroundColor: '#f6f8fa',
      ...theme.typography.body1,
    },
    textArea: {
      backgroundColor: '#f6f8fa',
      borderWidth: '1px !important',
      borderStyle: 'solid',
      borderColor: `${theme.palette.tertiary.main} !important`,
      borderRadius: theme.shape.borderRadius,
      outline: 'none',
      ...theme.typography.body1,
    },
    grip: {
      backgroundColor: '#f6f8fa  !important',
      height: '20px  !important',
      borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
    },
  }
})

const MarkdownEditor = ({ content = '', onChange = () => {} }) => {
  const classes = useStyles()
  const [selectedTab, setSelectedTab] = useState('write')

  return (
    <div className={classes.container}>
      <ReactMde
        classes={classes}
        commands={listCommands}
        value={content}
        selectedTab={selectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(<ReactMarkdown source={markdown} />)
        }
        onChange={onChange}
        onTabChange={setSelectedTab}
      />
    </div>
  )
}

export default MarkdownEditor
