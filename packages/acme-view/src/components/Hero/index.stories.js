import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { text } from '@storybook/addon-knobs'

import Hero from '.'

storiesOf('Hero', module)
  .addDecorator(jsxDecorator)
  .add('Interactive', () => {
    return (
      <Hero
        title={text('title', 'Accelerating the insurance industry')}
        subtitle={text(
          'subtitle',
          'The new accelerator for insurance from the team who brought you Orion'
        )}
        imageSrc={text('imageSrc', '')}
      />
    )
  })
