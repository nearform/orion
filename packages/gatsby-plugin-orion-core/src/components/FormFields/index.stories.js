import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { InputField } from '.'
import { boolean, text } from '@storybook/addon-knobs'

const selectOptions = ['option 1', 'option 2', 'option 3']

const knob = kind => {
  const knobsList = {
    label: text('label', 'My label'),
    required: boolean('required', false),
    error: text('error message', ''),
    helperText: boolean('show helper text', false)
      ? text('helper text', 'helper text')
      : '',
  }
  return knobsList[kind]
}

storiesOf('FormFields', module)
  .addDecorator(jsxDecorator)
  .add('Select', () => {
    const [selectedOpt, setSelectedOpt] = useState()
    return (
      <div>
        <InputField
          type="select"
          name="selectName"
          options={selectOptions}
          required={knob('required')}
          value={selectedOpt}
          error={knob('error')}
          helperText={knob('helperText')}
          onChange={e => setSelectedOpt(e.target.value)}
        >
          {knob('label')}
        </InputField>
      </div>
    )
  })
  .add('Text Field', () => {
    const [inputValue, setInputValue] = useState()
    return (
      <InputField
        type="text"
        name="textFieldName"
        required={knob('required')}
        value={inputValue}
        error={knob('error')}
        helperText={knob('helperText')}
        onChange={e => setInputValue(e.target.value)}
      >
        {knob('label')}
      </InputField>
    )
  })
  .add('Image', () => <InputField type="image" />)
