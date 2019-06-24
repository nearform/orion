import React from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { withKnobs } from '@storybook/addon-knobs'
import { withStyles } from '@material-ui/core'

import RichTextEditor from './RichTextEditor'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: '100px 100px 0',
  },
}

const ContainedRichTextEditor = ({ classes, ...props }) => (
  <div className={classes.root}>
    <RichTextEditor {...props} />
  </div>
)

ContainedRichTextEditor.propTypes = {
  classes: PropTypes.object,
}

const ThemedRichTextEditor = withStyles(styles)(ContainedRichTextEditor)

const dummyData = `
  <h3>Heading 3</h3>
  <h4>Heading 4</h4>
  <p>Body text - first paragraph 18px Lato</p>
  <p>Body text 16px Lato</p>
  <p>Body text with <i>italics</i>, <strong>bold text</strong> and a <a href='#'>link to an article</a></p>
  <ul>
    <li>Bulleted List</li>
    <li>Bulleted List</li>
    <li>Bulleted List</li>
  </ul>
  <ol>
    <li>Numbered List</li>
    <li>Numbered List</li>
    <li>Numbered List</li>
  </ol>
  <blockquote>
    <p>Quote - Lato 18px italic using slateGrey</p>
  </blockquote>
`

storiesOf('RichTextEditor', module)
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .add('RichTextEditor', () => <ThemedRichTextEditor data={dummyData} />)
