import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import selectEvent from 'react-select-event'
import TagsSelect from '.'
import { useMutation } from 'graphql-hooks'

jest.mock(
  '../../queries/update-page-tags.graphql',
  () => 'mockupdatePageTagsMutation'
)
jest.mock(
  '../../queries/delete-page-tag.graphql',
  () => 'mockDeletePageTagMutation'
)
jest.mock(
  '../../queries/clear-page-tags.graphql',
  () => 'mockClearPageTagsMutation'
)

jest.mock('graphql-hooks')
const mockUpdatePageTags = jest.fn()
const mockDeletePageTag = jest.fn()
const mockClearPageTags = jest.fn()
useMutation.mockImplementation(mutation => {
  if (mutation === 'mockupdatePageTagsMutation') {
    return [mockUpdatePageTags]
  }

  if (mutation === 'mockDeletePageTagMutation') {
    return [mockDeletePageTag]
  }

  if (mutation === 'mockClearPageTagsMutation') {
    return [mockClearPageTags]
  }

  return []
})
const mockHandleSaveTags = jest.fn()
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
        handleSaveTags={mockHandleSaveTags}
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

  describe('when a tag is selected from the existing list', () => {
    let form

    beforeEach(() => {
      form = setupForm()

      selectEvent.openMenu(form.getByLabelText('Test Label'))
      fireEvent.click(form.getByText('test'))
    })
    it('then it adds the tag to the page', () => {
      const { getByLabelText, getByText } = form

      selectEvent.openMenu(getByLabelText('Test Label'))
      fireEvent.click(getByText('test'))

      expect(mockUpdatePageTags).toHaveBeenCalledWith({
        variables: {
          isNewTag: false,
          pageId: 1,
          tag: 'test',
        },
      })
      expect(getByText('test')).toBeInTheDocument()
    })

    it('saves the tag using the callback passed in', () => {
      expect(mockHandleSaveTags).toHaveBeenCalledWith([
        { tag: { hidden: false, tag: 'test' } },
      ])
    })

    describe('And a new tag is created', () => {
      beforeEach(async () => {
        await selectEvent.create(
          form.getByLabelText('Test Label'),
          'orion-rocks'
        )
      })
      it('Then adds the tag and shows all the currently selected tags', () => {
        const { getByText } = form

        expect(getByText('test')).toBeInTheDocument()
        expect(getByText('orion-rocks')).toBeInTheDocument()
      })
    })
  })
  describe('when a new tag is is created', () => {
    let form

    beforeEach(async () => {
      form = setupForm()

      await selectEvent.create(form.getByLabelText('Test Label'), 'orion-rocks')
    })
    it('then it adds the tag to the page and to the total list of tags', async () => {
      const { getByText } = form

      expect(mockUpdatePageTags).toHaveBeenCalledWith({
        variables: {
          isNewTag: true,
          pageId: 1,
          tag: 'orion-rocks',
        },
      })

      expect(getByText('orion-rocks')).toBeInTheDocument()
    })
    it('saves the tag using the callback passed in', () => {
      expect(mockHandleSaveTags).toHaveBeenCalledWith([
        { tag: { hidden: false, tag: 'orion-rocks' } },
      ])
    })
  })

  describe('When a tag is deleted', () => {
    const tag = 'removed'
    let form

    beforeEach(() => {
      form = setupForm([{ tag: { tag } }, { tag: { tag: 'still-here' } }])
      const tagElement = form.queryByText(tag).parentElement
      fireEvent.click(tagElement.querySelector('svg'))
    })
    it('Then it is removed from the page', async () => {
      const { queryByText } = form
      expect(mockDeletePageTag).toHaveBeenCalledWith({
        variables: {
          pageId: 1,
          tag,
        },
      })
      expect(queryByText(tag)).not.toBeInTheDocument()
    })

    it('saves the tag using the callback passed in', () => {
      expect(mockHandleSaveTags).toHaveBeenCalledWith([
        {
          tag: {
            hidden: false,
            tag: 'still-here',
          },
        },
      ])
    })
  })

  describe('When clearing all the tags from a page', () => {
    let form
    beforeEach(async () => {
      form = setupForm([{ tag: { tag: 'tag 1' } }, { tag: { tag: 'tag 2' } }])
      await selectEvent.clearAll(form.getByLabelText('Test Label'))
    })
    it('Then all tags are deleted', async () => {
      const { queryByText } = form
      expect(mockClearPageTags).toHaveBeenCalledWith({
        variables: {
          pageId: 1,
        },
      })

      expect(queryByText('tag 1')).not.toBeInTheDocument()
      expect(queryByText('tag 2')).not.toBeInTheDocument()
    })

    it('saves the tag using the callback passed in', () => {
      expect(mockHandleSaveTags).toHaveBeenCalledWith([])
    })
  })
})
