import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

import ArticleMetadata from '.'

const content = [
  {
    label: 'Page Title',
    name: 'title',
    type: 'title',
    value: 'Example Page Title',
  },
  {
    label: 'Page Description',
    type: 'meta',
    name: 'description',
    multiline: true,
    value: 'Example Page Description',
  },
  {
    label: 'Open Graph Type',
    type: 'meta',
    name: 'og:type',
    property: 'og:type',
    value: 'article',
  },
  {
    label: 'Open Graph Title',
    type: 'meta',
    name: 'og:title',
    property: 'og:title',
    value: 'Example Page Title',
  },
  {
    label: 'Open Graph Description',
    type: 'meta',
    name: 'og:description',
    multiline: true,
    property: 'og:description',
    value: 'Example Page Description',
  },
  {
    label: 'Open Graph Image',
    type: 'meta',
    name: 'og:image',
    property: 'og:image',
    value: '',
  },
  {
    label: 'Structured Data',
    type: 'script',
    multiline: true,
    name: 'structuredData',
    value: '{}',
  },
]

storiesOf('Edit/Interactive/Article Metadata', module)
  .addDecorator(jsxDecorator)
  .add('default', () => <ArticleMetadata content={content} />)
