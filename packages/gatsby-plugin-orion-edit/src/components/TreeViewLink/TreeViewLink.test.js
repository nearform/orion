/* eslint-disable max-nested-callbacks */
/* eslint-disable camelcase */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import TreeViewLink from '.'
import { useMutation } from 'graphql-hooks'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import theme from 'gatsby-theme-acme'

jest.useFakeTimers()

jest.mock(
  '../../queries/update-page-title.graphql',
  () => 'updatePageTitleMutation'
)
jest.mock(
  '../../queries/update-page-show_in_menu.graphql',
  () => 'updatePageShowInMenuMutation'
)
jest.mock('graphql-hooks')
const mockUpdatePageShowInMenuMutation = jest.fn()
const mockUpdatePageTitleMutation = jest.fn()
useMutation.mockImplementation(mutation => {
  if (mutation === 'updatePageTitleMutation') {
    return [mockUpdatePageTitleMutation]
  }

  if (mutation === 'updatePageShowInMenuMutation') {
    return [mockUpdatePageShowInMenuMutation]
  }

  return []
})

const props = {
  title: 'great titles are made',
  to: '/great-title-slug',
  pageId: 123,
}
const renderComponent = () =>
  render(
    <ThemeProvider theme={createMuiTheme(theme)}>
      <TreeViewLink {...props} />
    </ThemeProvider>
  )

describe('TreeViewLink component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('When the component first loads', () => {
    let component

    beforeEach(() => {
      component = renderComponent()
    })
    it('shows a Link to the relevent page', () => {
      const { getByText } = component
      expect(getByText(props.title)).toHaveAttribute('href', props.to)
      expect(getByText(props.title)).toMatchInlineSnapshot(`
        <a
          href="/great-title-slug"
        >
          great titles are made
        </a>
      `)
    })

    it('shows a button to edit the page title', () => {
      const { getByText } = component

      expect(getByText(props.title).nextSibling).toBeInTheDocument()
    })

    describe('And I click the edit button', () => {
      beforeEach(() => {
        const { getByText } = component
        fireEvent.click(getByText(props.title).nextSibling)
      })
      it('then it shows an input with a value initialised to be the title', () => {
        const { getByDisplayValue } = component
        expect(getByDisplayValue(props.title)).toBeInTheDocument()
      })

      describe('And I change the title', () => {
        beforeEach(() => {
          const { getByDisplayValue } = component

          fireEvent.change(getByDisplayValue(props.title), {
            target: { value: 'a new title' },
          })
        })
        describe('And then click away from the input without saving', () => {
          beforeEach(() => {
            const { getByDisplayValue } = component
            fireEvent.blur(getByDisplayValue('a new title'))
          })
          it('shows the original title as a link again', () => {
            const { getByText } = component
            jest.runAllTimers()
            expect(getByText(props.title)).toBeInTheDocument()
          })
        })

        describe('And then I submit the form to save the changes', () => {
          beforeEach(() => {
            const { getByDisplayValue } = component
            fireEvent.blur(getByDisplayValue('a new title'))
            fireEvent.click(getByDisplayValue('a new title').nextSibling)
          })
          it('shows the new title as a link', () => {
            const { getByText } = component
            expect(getByText('a new title')).toBeInTheDocument()
          })
          it('calls the graphql mutation to save the change', () => {
            expect(mockUpdatePageTitleMutation).toHaveBeenCalledWith({
              variables: {
                id: 123,
                title: 'a new title',
              },
            })
          })
        })
      })
    })

    describe('I want to include this page in the menu', () => {
      it('shows a button with include aria-label', () => {
        const { getByLabelText } = component
        expect(getByLabelText('include page in menu')).toBeInTheDocument()
      })
    })

    describe('Toggles show in menu state after click', () => {
      beforeEach(() => {
        const { getByLabelText } = component
        fireEvent.click(getByLabelText('include page in menu'))
      })
      it('calls the graphql mutation to save the change', () => {
        expect(mockUpdatePageShowInMenuMutation).toHaveBeenCalledWith({
          variables: {
            id: 123,
            show_in_menu: true,
          },
        })
      })

      it('shows a button with exclude aria-label', () => {
        const { getByLabelText } = component
        expect(getByLabelText('exclude page from menu')).toBeInTheDocument()
      })
    })
  })
})
