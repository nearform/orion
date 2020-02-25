import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { boolean } from '@storybook/addon-knobs'

import ArticleEditButtons from '.'

storiesOf('Article Edit Buttons', module)
  .addDecorator(jsxDecorator)
  .add('default', () => (
    <ArticleEditButtons isEditing={boolean('Currently Editing', true)} />
  ))
