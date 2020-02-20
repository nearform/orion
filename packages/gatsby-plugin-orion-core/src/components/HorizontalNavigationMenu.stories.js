import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { select, text, object } from '@storybook/addon-knobs'
import { AppBar, Toolbar } from '@material-ui/core'

import HorizontalNavigationMenu from './HorizontalNavigationMenu'

const menuData = [
  {
    label: 'About',
    children: [
      { label: 'About Acme', to: '/about/acme' },
      { label: 'Our History', to: '/about/history' },
      {
        label: 'Our Team',
        to: '/about/our-team',
        children: [
          { label: 'Our Board', to: '/about/team/our-board' },
          { label: 'Management', to: '/about/team/management' },
          { label: 'Careers', to: '/about/team/careers' },
          { label: 'Graduates', to: '/about/team/graduates' },
        ],
      },
      { label: 'Our Policies', to: '/about/policies' },
    ],
  },
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
    leftIconClass: 'fas fa-user-shield',
    authRole: 'Admin',
    children: [
      {
        label: 'Manage Users',
        to: '/admin/users',
        rightIconClass: 'fas fa-users',
      },
      {
        label: 'Manage Content',
        to: 'admin/content',
        rightIconClass: 'fas fa-sliders-h',
      },
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
      <AppBar>
        <Toolbar>
          <HorizontalNavigationMenu
            childIndicatorIcon={text(
              'Child Indicator Icon',
              'fas fa-chevron-right'
            )}
            dropDownIndicatorIcon={text(
              'Drop Down Indicator Icon',
              'fas fa-chevron-down'
            )}
            userRole={select('User Role', ['User', 'Admin'], 'Admin')}
            data={object('Menu Data', menuData)}
          />
        </Toolbar>
      </AppBar>
    )
  })
