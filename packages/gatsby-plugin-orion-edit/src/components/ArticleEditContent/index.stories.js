import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

import ArticleEditContent from '.'

storiesOf('Article Edit Content', module)
  .addDecorator(jsxDecorator)
  .add('default', () => <ArticleEditContent />)
