import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { number } from '@storybook/addon-knobs'
import BreadcrumbNavigation from '.'

const data = [
  {
    title: 'Home',
    to: '/',
  },
  {
    title: 'Our History',
    to: '/our-history',
  },
  {
    title: '1900 - 1999',
    to: '/our-history/1900-1999',
  },
  {
    title: 'December 1999',
    to: '/our-history/1900-1999/december-1999',
  },
  {
    title: '12th December 1999',
    to: '/our-history/1900-1999/december-1999/12',
  },
  {
    title: '4am - 5am',
    to: '/our-history/1900-1999/december-1999/12/4-5',
  },
  {
    title: 'Notable Events',
    to: '/our-history/1900-1999/december-1999/12/4-5/notable-events',
  },
]

storiesOf('core/interactive/BreadcrumbNavigation', module)
  .addDecorator(jsxDecorator)
  .add('Interactive', () => {
    return (
      <BreadcrumbNavigation
        data={data}
        itemsAfterCollapse={number('Items after collapse', 1)}
        itemsBeforeCollapse={number('Items before collapse', 1)}
        maxItems={number('Max items', 8)}
      />
    )
  })
