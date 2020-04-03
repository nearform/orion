import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CreatableSelect from 'react-select/creatable'

import updatePageTagsMutation from '../../queries/update-page-tags.graphql'
import deletePageTagMutation from '../../queries/delete-page-tag.graphql'
import clearPageTagsMutation from '../../queries/clear-page-tags.graphql'
import { useMutation } from 'graphql-hooks'

const styles = {
  menu: provided => ({
    ...provided,
    zIndex: 1000,
  }),
}
const createOption = ({ tag: label }) => ({
  label,
  value: label.toLowerCase().replace(/[^-\w]/g, ''),
})
const mapValue = ({ tag }) => ({
  label: tag.tag,
  value: tag.tag.toLowerCase().replace(/[^-\w]/g, ''),
})

const TagsSelect = ({
  existingTags = [],
  currentTags = [],
  name,
  pageId,
  handleSaveTags,
}) => {
  const initialState = {
    isLoading: false,
    options: existingTags.map(createOption),
    value: currentTags.map(mapValue),
  }
  const [state, setState] = useState(initialState)
  const [updatePageTags] = useMutation(updatePageTagsMutation)
  const [deletePageTag] = useMutation(deletePageTagMutation)
  const [clearPageTag] = useMutation(clearPageTagsMutation)
  const updateState = values => setState({ ...state, ...values })

  const handleChange = (newValue, actionMeta) => {
    if (actionMeta.action === 'remove-value') {
      deletePageTag({
        variables: {
          pageId,
          tag: actionMeta.removedValue.value,
        },
      })
      newValue = state.value.filter(
        tag => tag.value !== actionMeta.removedValue.value
      )
    }

    if (actionMeta.action === 'clear') {
      clearPageTag({ variables: { pageId } })
    }

    if (actionMeta.action === 'select-option') {
      updatePageTags({
        variables: {
          isNewTag: false,
          pageId,
          tag: actionMeta.option.value,
        },
      })
    }

    updateState({ value: newValue })
    handleSaveTags(
      newValue.map(({ value }) => ({ tag: { tag: value, hidden: false } }))
    )
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
    const newValue = state.value.concat([newOption])
    updateState({
      isLoading: false,
      options: [...options, newOption],
      value: newValue,
    })
    handleSaveTags(
      newValue.map(({ value }) => ({ tag: { tag: value, hidden: false } }))
    )
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
  handleSaveTags: PropTypes.func.isRequired,
}
TagsSelect.defaultProps = {
  currentTags: [],
  name: '',
}

export default TagsSelect
