import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { select, number } from '@storybook/addon-knobs'

import VerticalNavigationMenu from '.'

const linksData = [
  {
    label: 'Quick Find',
    to: '/quick-find',
  },
  { label: 'Pages', to: '/pages' },
  {
    label: 'Articles',
    to: '/articles',
  },
]

storiesOf('VerticalNavigationMenu', module)
  .addDecorator(jsxDecorator)
  .add('Interactive', () => (
    <VerticalNavigationMenu
      data={linksData}
      userRole={select('User Role', ['User', 'Admin'], 'Admin')}
      path={select(
        'Current Path',
        ['/articles', '/quick-find', '/pages', '/other'],
        '/articles'
      )}
      depthIndent={number('Level indent value in px', 20)}
    />
  ))
