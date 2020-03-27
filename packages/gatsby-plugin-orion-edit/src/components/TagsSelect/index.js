import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CreatableSelect from 'react-select/creatable'

import updatePageTagsMutation from '../../queries/update-page-tags.graphql'
import { useMutation } from 'graphql-hooks'

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

const TagsSelect = ({ existingTags = [], currentTags = [], name, pageId }) => {
  const initialState = {
    isLoading: false,
    options: existingTags.map(createOption),
    value: currentTags.map(mapValue),
  }
  const [state, setState] = useState(initialState)
  const [updatePageTags] = useMutation(updatePageTagsMutation)
  const updateState = values => setState({ ...state, ...values })

  const handleChange = (newValue, actionMeta) => {
    updatePageTags({
      variables: {
        isNewTag: false,
        pageId,
        tag: actionMeta.option.value,
      },
    })
    updateState({ value: newValue })
  }

  const handleCreate = inputValue => {
    updateState({ isLoading: true })
    const { options } = state
    const newOption = createOption({ tag: inputValue })
    updatePageTags({
      variables: {
        isNewTag: true,
        pageId,
        tag: inputValue,
      },
    })
    updateState({
      isLoading: false,
      options: [...options, newOption],
      value: newOption,
    })
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
  pageId: PropTypes.number.isRequired,
}
TagsSelect.defaultProps = {
  currentTags: [],
  name: '',
}

export default TagsSelect
