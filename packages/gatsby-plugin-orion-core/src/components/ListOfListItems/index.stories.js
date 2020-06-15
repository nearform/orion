import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { select, number } from '@storybook/addon-knobs'

import ListOfListItems from '.'

const linksData = [
  {
    label: 'Quick Find',
    to: '/quick-find',
    iconClass: 'fas fa-search',
    onClick: () => {
      // eslint-disable-next-line no-alert
      alert('Hello! I am an alert box triggered by onClick!!')
    },
  },
  { label: 'Pages', to: '/pages', iconClass: 'fas fa-file' },
  {
    label: 'Admin',
    to: '/admin',
    iconClass: 'fas fa-user-cog',
    linkAuth: {
      role: 'Admin',
    },
    onClick: () => {
      // eslint-disable-next-line no-alert
      alert('Hello! I am an alert box triggered by onClick!!')
    },
  },
  {
    label: 'Articles',
    to: '/articles',
    iconClass: 'fas fa-newspaper',
    children: [
      {
        label: 'Editors Picks',
        to: '/editors-picks',
        iconClass: 'fas fa-long-arrow-alt-right',
        children: [
          {
            label: 'Best Editors Picks',
            to: '/best-editors-picks',
            iconClass: 'fas fa-long-arrow-alt-right',
            children: [
              {
                label: 'Bestest Editors Picks',
                to: '/bestest-editors-picks',
                iconClass: 'fas fa-long-arrow-alt-right',
                children: [
                  {
                    label: 'Most Bestest Editors Picks',
                    to: '/most-bestest-editors-picks',
                    iconClass: 'fas fa-long-arrow-alt-right',
                  },
                ],
              },
              {
                label: 'Admin only best picks',
                to: '/admin-best-picks',
                iconClass: 'fas fa-user-shield',
                linkAuth: {
                  role: 'Admin',
                },
              },
            ],
          },
        ],
      },
      {
        label: 'Latest News',
        to: '/latest-news',
        iconClass: 'fas fa-long-arrow-alt-right',
      },
      {
        label: 'Featured',
        to: '/featured',
        iconClass: 'fas fa-long-arrow-alt-right',
      },
    ],
  },
  {
    label: 'Menu',
    to: '/Menus',
    iconClass: 'fas fa-map',
  },
  {
    label: 'Categories / Tags',
    to: '/categories',
    iconClass: 'fas fa-tags',
  },
  {
    label: 'Media Library',
    to: '/media-library',
    iconClass: 'fas fa-photo-video',
  },
  {
    label: 'Users',
    to: '/users',
    iconClass: 'fas fa-user-friends',
  },
  {
    label: 'Sign out',
    to: '/sign-out',
    iconClass: 'fas fa-long-arrow-alt-left',
  },
]

storiesOf('core/interactive/ListOfListItems', module)
  .addDecorator(jsxDecorator)
  .add('Interactive', () => (
    <ListOfListItems
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
      isFullyExpanded={select(
        'Show all levels by default',
        [false, true],
        false
      )}
      depthIndent={number('Level indent value in px', 20)}
    />
  ))
