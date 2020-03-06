import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { text } from '@storybook/addon-knobs'

import Hero from '.'
import heroImage from '../../../assets/orion-hero-2x.png'

storiesOf('Hero', module)
  .addDecorator(jsxDecorator)
  .add('Interactive', () => {
    return <Hero imageSrc={text('imageSrc', heroImage)} />
  })
