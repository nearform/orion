import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { select, text, object } from '@storybook/addon-knobs'

import HorizontalNavigationMenu from './HorizontalNavigationMenu'

const menuData = [
  {
    label: 'Articles',
    leftIconClass: 'fas fa-book',
    children: [
      {
        label: 'Manage',
        to: '/admin/manage-articles',
        leftIconClass: 'fas fa-cogs',
        authRole: 'Admin',
      },
      {
        label: 'Article 1',
        to: '/articles/aritcle-1',
        leftIconClass: 'fas fa-file-alt',
      },
      {
        label: 'Article 2',
        to: '/articles/aritcle-1',
        leftIconClass: 'fas fa-file-alt',
      },
      {
        label: 'Terms and Conditions',
        to: '/articles/terms-and-conditions',
        leftIconClass: 'fas fa-book',
        children: [
          {
            label: 'Ask a Question',
            to: '/contact',
            children: [
              { label: 'Lawyers', to: '/contact/lawyers' },
              { label: 'HR', to: '/contact/hr' },
            ],
          },
          {
            label: 'Legal Stuff',
            to: '/articles/terms-and-conditions/legal-stuff',
            leftIconClass: 'fas fa-file-alt',
          },
          {
            label: 'Legal Stuff (more)',
            to: '/articles/terms-and-conditions/legal-stuff-more',
            leftIconClass: 'fas fa-file-alt',
          },
        ],
      },
    ],
  },
  {
    label: 'Admin',
    rightIconClass: 'fas fa-lock-open',
    authRole: 'Admin',
    children: [
      { label: 'Manage Users', to: '/admin/users' },
      { label: 'Manage Content', to: 'admin/content' },
    ],
  },
  {
    label: 'Your Account',
    to: '/account',
  },
]

storiesOf('HorizontalNavigationMenu', module)
  .addDecorator(jsxDecorator)
  .add('Interactive', () => {
    return (
      <HorizontalNavigationMenu
        childIndicatorIcon={text('Child Indicator Icon', 'fas fa-caret-right')}
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
        data={object('Menu Data', menuData)}
      />
    )
  })
