import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { text, select } from '@storybook/addon-knobs'

import ArticleStatusAndAuthor from '.'

storiesOf('ArticleStatusAndAuthor', module)
  .addDecorator(jsxDecorator)
  .add('In Progress', () => (
    <ArticleStatusAndAuthor
      author={text('Author', 'Bob Saget')}
      articleStatus={select(
        'Article Status',
        ['in-progress', 'in-review', 'published', 'hidden'],
        'published'
      )}
    />
  ))
