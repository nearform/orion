import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

import ArticleStatusChip from '.'

storiesOf('core/interactive/ArticleStatusChip', module)
  .addDecorator(jsxDecorator)
  .add('In Progress', () => <ArticleStatusChip status="in-progress" />)
  .add('Needs Review', () => <ArticleStatusChip status="in-review" />)
  .add('Published', () => <ArticleStatusChip status="published" />)
  .add('Hidden', () => <ArticleStatusChip status="hidden" />)
