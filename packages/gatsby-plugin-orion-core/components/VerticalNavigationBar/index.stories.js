import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { select, number } from '@storybook/addon-knobs'

import VerticalNavigationBar from '.'

const linksData = [
  {
    linkTitle: 'Quick Find',
    linkDestination: '/quick-find',
    iconClass: 'fas fa-search',
  },
  { linkTitle: 'Pages', linkDestination: '/pages', iconClass: 'fas fa-file' },
  {
    linkTitle: 'Admin',
    linkDestination: '/admin',
    iconClass: 'fas fa-user-cog',
    linkAuth: {
      role: 'Admin',
    },
  },
  {
    linkTitle: 'Articles',
    linkDestination: '/articles',
    iconClass: 'fas fa-newspaper',
    children: [
      {
        linkTitle: 'Editors Picks',
        linkDestination: '/editors-picks',
        iconClass: 'fas fa-long-arrow-alt-right',
        children: [
          {
            linkTitle: 'Best Editors Picks',
            linkDestination: '/best-editors-picks',
            iconClass: 'fas fa-long-arrow-alt-right',
            children: [
              {
                linkTitle: 'Bestest Editors Picks',
                linkDestination: '/bestest-editors-picks',
                iconClass: 'fas fa-long-arrow-alt-right',
                children: [
                  {
                    linkTitle: 'Most Bestest Editors Picks',
                    linkDestination: '/most-bestest-editors-picks',
                    iconClass: 'fas fa-long-arrow-alt-right',
                  },
                ],
              },
              {
                linkTitle: 'Admin only best picks',
                linkDestination: '/admin-best-picks',
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
        linkTitle: 'Latest News',
        linkDestination: '/latest-news',
        iconClass: 'fas fa-long-arrow-alt-right',
      },
      {
        linkTitle: 'Featured',
        linkDestination: '/featured',
        iconClass: 'fas fa-long-arrow-alt-right',
      },
    ],
  },
  {
    linkTitle: 'Menu',
    linkDestination: '/Menus',
    iconClass: 'fas fa-map',
  },
  {
    linkTitle: 'Categories / Tags',
    linkDestination: '/categories',
    iconClass: 'fas fa-tags',
  },
  {
    linkTitle: 'Media Library',
    linkDestination: '/media-library',
    iconClass: 'fas fa-photo-video',
  },
  {
    linkTitle: 'Users',
    linkDestination: '/users',
    iconClass: 'fas fa-user-friends',
  },
  {
    linkTitle: 'Sign out',
    linkDestination: '/sign-out',
    iconClass: 'fas fa-long-arrow-alt-left',
  },
]

storiesOf('VerticalNavigationBar', module)
  .addDecorator(jsxDecorator)
  .add('Interactive', () => {
    const [showSidebar, setShowSidebar] = useState(true)

    return (
      <VerticalNavigationBar
        open={showSidebar}
        closeSidebar={() => {
          setShowSidebar(!showSidebar)
        }}
        variant={select(
          'Navbar Variant',
          ['permanent', 'persistent'],
          'permanent'
        )}
        anchor={select('Side of Screen', ['left', 'right'], 'left')}
        data={JSON.stringify(linksData)}
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
    )
  })
