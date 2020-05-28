import React from 'react'
import SearchInput from 'gatsby-plugin-orion-core/src/components/SearchInput'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import SecondaryAppBar from '.'

const data = [
  {
    title: 'Home',
    to: '/',
  },
  {
    title: 'Latest News',
    to: '/latest-news',
  },
]

storiesOf('View/Interactive/Secondary App Bar', module)
  .addDecorator(jsxDecorator)
  .add('Overview', () => {
    return <SecondaryAppBar action={<SearchInput />} data={data} />
  })
