import React from 'react'
import { render } from '@testing-library/react'
import selectEvent from 'react-select-event'
import TagsSelect from '.'

const existingTags = [{ tag: 'test' }, { tag: 'something' }]
const setupForm = currentTags =>
  render(
    <form role="form">
      <label htmlFor="testName">Test Label</label>
      <TagsSelect
        existingTags={existingTags}
        name="testName"
        currentTags={currentTags}
      />
    </form>
  )
describe('TagsSelect component', () => {
  it('populates the select with all existing tags', async () => {
    const { getByLabelText, queryByText } = setupForm()
    expect(queryByText('test')).not.toBeInTheDocument()
    expect(queryByText('something')).not.toBeInTheDocument()

    selectEvent.openMenu(getByLabelText('Test Label'))

    expect(queryByText('test')).toBeInTheDocument()
    expect(queryByText('something')).toBeInTheDocument()
  })

  it('preselects the values', () => {
    const { queryByText } = setupForm([{ tag: { tag: 'test' } }])
    expect(queryByText('test')).toBeInTheDocument()
    expect(queryByText('something')).not.toBeInTheDocument()
  })
})
