import React, { useState } from 'react'

import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { text, select, radio } from '@storybook/addon-knobs'

import { Card, withStyles } from '@material-ui/core'
import _VerticalNavigationBar from './VerticalNavigationBar'

const VerticalNavigationBar = withStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
}))(_VerticalNavigationBar)
const Section = withStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2),
    margin: theme.spacing(3),
  },
}))(Card)

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

let showSidebar
let setShowSidebar

storiesOf('VerticalNavigationBar', module)
  .addDecorator(jsxDecorator)
  .add(
    'Interactive',
    () => (
      ([showSidebar, setShowSidebar] = useState(true)),
      (
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
          anchor="left"
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
          fullyExpanded={select(
            'Show all levels by default',
            [false, true],
            false
          )}
          depthIndent={20}
        />
      )
    )
  )
