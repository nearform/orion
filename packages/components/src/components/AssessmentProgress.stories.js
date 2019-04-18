import React from 'react'

import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { number } from '@storybook/addon-knobs'

import AssessmentProgress from './AssessmentProgress'

storiesOf('AssessmentProgress', module)
  .addDecorator(jsxDecorator)
  .add('AssessmentProgress', () => (
    <AssessmentProgress
      progress={number('progress', 10)}
      direction={number('direction')}
      execution={number('execution', 50)}
      results={number('results', 100)}
    />
  ))
