import SearchInput from '.'
import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

storiesOf('SearchInput', module)
  .addDecorator(jsxDecorator)
  .add('Default', () => (
    <div style={{ width: 256 }}>
      <SearchInput
        onSearch={value => console.log(`You searched for "${value}"`)}
      />
    </div>
  ))
