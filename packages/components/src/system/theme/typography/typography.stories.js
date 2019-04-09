import React from 'react'

import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs/react'
import { jsxDecorator } from 'storybook-addon-jsx'

storiesOf('System/Typography/Headings', module)
  .addDecorator(jsxDecorator)
  .add('Basic Header 1 Example', () => (
    <h1>{text('header', 'Header level 1')}</h1>
  ))
  .add('Basic Header 2 Example', () => (
    <h2>{text('header', 'Header level 2')}</h2>
  ))
  .add('Basic Header 3 Example', () => (
    <h3>{text('header', 'Header level 3')}</h3>
  ))
  .add('Basic Header 4 Example', () => (
    <h4>{text('header', 'Header level 4')}</h4>
  ))
  .add('Basic Header 5 Example', () => (
    <h5>{text('header', 'Header level 5')}</h5>
  ))
  .add('Basic Header 6 Example', () => (
    <h6>{text('header', 'Header level 6')}</h6>
  ))

storiesOf('System/Typography/Text', module)
  .addDecorator(jsxDecorator)
  .add('Basic Paragraph Example', () => (
    <p>
      {text('parargraph', 'Omnis id corrupti iusto sit similique qui amet.')}
    </p>
  ))

storiesOf('System/Typography/Text', module)
  .addDecorator(jsxDecorator)
  .add('Basic Button Example', () => (
    <button>{text('text', 'Sample Button Text')}</button>
  ))
