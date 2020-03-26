/* eslint-disable no-console */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CreatableSelect from 'react-select/creatable'

const styles = {
  menu: provided => ({
    ...provided,
    zIndex: 1000,
  }),
}
const createOption = label => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
})

const TagsSelect = ({ existingTags = [], currentTags = [] }) => {
  const initialState = {
    isLoading: false,
    options: existingTags,
    value: currentTags,
  }
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
    <CreatableSelect
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      options={options}
      value={value}
      styles={styles}
      onChange={handleChange}
      onCreateOption={handleCreate}
    />
  )
}

TagsSelect.propTypes = {
  existingTags: PropTypes.array.isRequired,
  currentTags: PropTypes.array.isRequired,
}

export default TagsSelect
