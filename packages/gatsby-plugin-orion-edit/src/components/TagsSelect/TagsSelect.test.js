import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import selectEvent from 'react-select-event'
import TagsSelect from '.'
import { useMutation } from 'graphql-hooks'

jest.mock(
  '../../queries/update-page-tags.graphql',
  () => 'mockupdatePageTagsMutation'
)

jest.mock('graphql-hooks')
const mockUpdatePageTags = jest.fn()
useMutation.mockImplementation(() => [mockUpdatePageTags])

const existingTags = [{ tag: 'test' }, { tag: 'something' }]
const setupForm = currentTags =>
  render(
    <form role="form">
      <label htmlFor="testName">Test Label</label>
      <TagsSelect
        existingTags={existingTags}
        name="testName"
        currentTags={currentTags}
        pageId={1}
      />
    </form>
  )
describe('TagsSelect component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

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

  it('uses the updatePageTags mutation', () => {
    setupForm()
    expect(useMutation).toHaveBeenCalledWith('mockupdatePageTagsMutation')
  })

  describe('when a tag is selected from the existing list', () => {
    it('then it adds the tag to the page', () => {
      const { getByLabelText, getByText } = setupForm()

      selectEvent.openMenu(getByLabelText('Test Label'))
      fireEvent.click(getByText('test'))

      expect(mockUpdatePageTags).toHaveBeenCalledWith({
        variables: {
          isNewTag: false,
          pageId: 1,
          tag: 'test',
        },
      })
    })
  })
  describe('when a new tag is is created', () => {
    it('then it adds the tag to the page and to the total list of tags', async () => {
      const { getByLabelText } = setupForm()

      await selectEvent.create(getByLabelText('Test Label'), 'orion-rocks')

      expect(mockUpdatePageTags).toHaveBeenCalledWith({
        variables: {
          isNewTag: true,
          pageId: 1,
          tag: 'orion-rocks',
        },
      })
    })
  })
})
