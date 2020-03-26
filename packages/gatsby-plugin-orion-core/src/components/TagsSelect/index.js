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
const createOption = ({ tag: label }) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
})
const mapValue = ({ tag }) => ({
  label: tag.tag,
  value: tag.tag.toLowerCase().replace(/\W/g, ''),
})

const TagsSelect = ({ existingTags = [], currentTags = [], name }) => {
  const initialState = {
    isLoading: false,
    options: existingTags.map(createOption),
    value: currentTags.map(mapValue),
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
      isMulti
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      options={options}
      value={value}
      styles={styles}
      name={name}
      inputId={name}
      onChange={handleChange}
      onCreateOption={handleCreate}
    />
  )
}

TagsSelect.propTypes = {
  existingTags: PropTypes.arrayOf(PropTypes.shape({ tag: PropTypes.string }))
    .isRequired,
  currentTags: PropTypes.arrayOf(
    PropTypes.shape({
      tag: PropTypes.shape({
        tag: PropTypes.string,
      }),
    })
  ),
  name: PropTypes.string,
}
TagsSelect.defaultProps = {
  currentTags: [],
  name: '',
}

export default TagsSelect
