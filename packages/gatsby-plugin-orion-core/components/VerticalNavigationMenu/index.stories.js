import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { select, number } from '@storybook/addon-knobs'

import VerticalNavigationMenu from '.'

const linksData = [
  {
    label: 'Quick Find',
    to: '/quick-find',
    iconClass: 'fas fa-search',
  },
  { label: 'Pages', to: '/pages', iconClass: 'fas fa-file' },
]

storiesOf('VerticalNavigationMenu', module)
  .addDecorator(jsxDecorator)
  .add('Interactive', () => (
    <VerticalNavigationMenu
      data={linksData}
      userRole={select('User Role', ['User', 'Admin'], 'Admin')}
      path={select(
        'Current Path',
        [
          '/articles',
          '/editors-picks',
          '/best-editors-picks',
          '/bestest-editors-picks',
          '/most-bestest-editors-picks',
        ],
        '/articles'
      )}
      depthIndent={number('Level indent value in px', 20)}
    />
  ))
