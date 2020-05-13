/* eslint-disable max-nested-callbacks */
/* eslint-disable camelcase */
import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import TreeViewLink from '.'
import { useMutation } from 'graphql-hooks'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import theme from 'gatsby-theme-acme'

jest.useFakeTimers()

const mockDate = new Date('2020-03-09T13:05:20.588+00:00')

const _Date = Date
global.Date = jest.fn(() => mockDate)
global.Date.UTC = _Date.UTC
global.Date.parse = _Date.parse
global.Date.now = _Date.now

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

let promise = null
const makePageTitlePromise = title =>
  Promise.resolve({
    data: {
      update_orion_page: {
        returning: [{ title }],
      },
    },
  })

const mockUpdatePageTitleMutation = jest.fn(({ variables: { title } }) => {
  promise = makePageTitlePromise(title)
  return promise
})
useMutation.mockImplementation(mutation => {
  if (mutation === 'updatePageTitleMutation') {
    return [mockUpdatePageTitleMutation]
  }

  if (mutation === 'updatePageShowInMenuMutation') {
    return [mockUpdatePageShowInMenuMutation]
  }

  return []
})

const propsArticle = {
  title: 'great titles are made',
  to: '/great-title-slug',
  pageId: 123,
  layout: 'article',
}
const propsPage = {
  title: 'great titles are made',
  to: '/great-title-slug',
  pageId: 123,
  layout: 'page',
}
const renderComponent = props =>
  render(
    <ThemeProvider theme={createMuiTheme(theme)}>
      <TreeViewLink {...props} />
    </ThemeProvider>
  )

describe('TreeViewLink component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  let component

  describe('When the component first loads with page layout', () => {
    beforeEach(() => {
      component = renderComponent(propsPage)
    })
    it('shows a Link to the relevent page', () => {
      const { getByText } = component
      expect(getByText(propsPage.title)).toHaveAttribute('href', propsPage.to)
      expect(getByText(propsPage.title)).toMatchInlineSnapshot(`
        <a
          href="/great-title-slug"
        >
          great titles are made
        </a>
      `)
    })

    it('shows a button to edit the page title', () => {
      const { getByText } = component

      expect(getByText(propsPage.title).nextSibling).toBeInTheDocument()
    })

    describe('And I click the edit button', () => {
      beforeEach(() => {
        const { getByText } = component
        fireEvent.click(getByText(propsPage.title).nextSibling)
      })
      it('then it shows an input with a value initialised to be the title', () => {
        const { getByDisplayValue } = component
        expect(getByDisplayValue(propsPage.title)).toBeInTheDocument()
      })

      describe('And I change the title', () => {
        beforeEach(() => {
          const { getByDisplayValue } = component

          fireEvent.change(getByDisplayValue(propsPage.title), {
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
            act(() => {
              jest.runAllTimers()
            })
            expect(getByText(propsPage.title)).toBeInTheDocument()
          })
        })

        describe('And then I submit the form to save the changes', () => {
          beforeEach(async () => {
            const { getByDisplayValue } = component
            fireEvent.blur(getByDisplayValue('a new title'))
            fireEvent.click(getByDisplayValue('a new title').nextSibling)
            await act(() => promise)
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
                modified: mockDate,
              },
            })
          })

          describe('And then I edit the title a second time', () => {
            beforeEach(() => {
              const { getByDisplayValue, getByText } = component

              fireEvent.click(getByText('a new title').nextSibling)
              fireEvent.change(getByDisplayValue('a new title'), {
                target: { value: 'What the page' },
              })
            })

            describe('And then I click away from the input without saving', () => {
              beforeEach(async () => {
                const { getByDisplayValue } = component
                fireEvent.blur(getByDisplayValue('What the page'))

                await act(() => jest.runAllTimers())
              })
              it('shows the last saved title as a link again', () => {
                const { getByText } = component

                expect(getByText('a new title')).toBeInTheDocument()
              })
              it('does NOT show the original title', () => {
                const { queryByText } = component

                expect(queryByText(propsPage.title)).not.toBeInTheDocument()
              })
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
            modified: mockDate,
          },
        })
      })

      it('shows a button with exclude aria-label', () => {
        const { getByLabelText } = component
        expect(getByLabelText('exclude page from menu')).toBeInTheDocument()
      })
    })
  })

  describe('When the component first loads with article layout', () => {
    beforeEach(() => {
      component = renderComponent(propsArticle)
    })
    it('include button should not exist', () => {
      const { queryByLabelText } = component

      expect(queryByLabelText('include page in menu')).not.toBeInTheDocument()
    })
  })
})
