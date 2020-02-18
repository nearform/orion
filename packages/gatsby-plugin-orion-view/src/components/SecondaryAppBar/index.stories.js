import SecondaryAppBar from '.'
import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

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

storiesOf('SecondaryAppBar', module)
  .addDecorator(jsxDecorator)
  .add('Default', () => {
    return <SecondaryAppBar data={data} onSearch={() => {}} />
  })
