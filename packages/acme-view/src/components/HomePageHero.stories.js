import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { text } from '@storybook/addon-knobs'

import HomePageHero from './HomePageHero'
import heroImage from '../../assets/orion-hero-2x.png'

storiesOf('HomePageHero', module)
  .addDecorator(jsxDecorator)
  .add('Interactive', () => {
    return <HomePageHero imageSrc={text('imageSrc', heroImage)} />
  })
