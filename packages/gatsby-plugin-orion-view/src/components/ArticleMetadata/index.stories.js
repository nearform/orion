import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { number, object, text } from '@storybook/addon-knobs'
import ArticleMetadata from '.'

storiesOf('View/Interactive/Article Metadata', module)
  .addDecorator(jsxDecorator)
  .add('Overview', () => (
    <div style={{ width: 208 }}>
      <ArticleMetadata
        author={object('Author', {
          image: '',
          name: 'Sunil Thawani',
          title: 'Acme Researcher',
        })}
        created={text('Created', '2020-05-18')}
        readTime={number('Read time', 5)}
        section={text('Section', 'Latest News')}
      />
    </div>
  ))
