import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import SearchInput from '.'

storiesOf('core/interactive/SearchInput', module)
  .addDecorator(jsxDecorator)
  .add('Default', () => (
    <div style={{ width: 256 }}>
      <SearchInput />
    </div>
  ))
