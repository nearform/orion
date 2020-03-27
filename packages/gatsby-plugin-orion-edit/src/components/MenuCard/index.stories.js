import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { text } from '@storybook/addon-knobs'

import MenuCard from '.'

storiesOf('Menu card', module)
  .addDecorator(jsxDecorator)
  .add('default', () => (
    <MenuCard
      label={text('Label for the link', 'Pages')}
      to={text('Link location', '/pages')}
      src={text('Src link for the image', 'none')}
    />
  ))
