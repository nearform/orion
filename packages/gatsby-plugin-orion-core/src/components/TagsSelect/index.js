/* eslint-disable no-console */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CreatableSelect from 'react-select/creatable'
import { ErrorMessage, FieldLabel } from '../FormFields'

const createOption = label => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
})
const defaultOptions = [
  createOption('One'),
  createOption('Two'),
  createOption('Three'),
]
const initialState = {
  isLoading: false,
  options: defaultOptions,
  value: undefined,
}
const TagsSelect = ({ children, error }) => {
  const [state, setState] = useState(initialState)
  const updateState = values => setState({ ...state, ...values })

  const handleChange = (newValue, actionMeta) => {
    console.group('Value Changed')
    console.log(newValue)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
    updateState({ value: newValue })
  }

  const handleCreate = inputValue => {
    updateState({ isLoading: true })
    console.group('Option created')
    console.log('Wait a moment...')
    setTimeout(() => {
      const { options } = state
      const newOption = createOption(inputValue)
      console.log(newOption)
      console.groupEnd()
      updateState({
        isLoading: false,
        options: [...options, newOption],
        value: newOption,
      })
    }, 1000)
  }

  const { isLoading, options, value } = state
  return (
    <>
      <FieldLabel hasError={Boolean(error)}>{children}</FieldLabel>
      <CreatableSelect
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        options={options}
        value={value}
        onChange={handleChange}
        onCreateOption={handleCreate}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  )
}

TagsSelect.propTypes = {
  children: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
}

export default TagsSelect
