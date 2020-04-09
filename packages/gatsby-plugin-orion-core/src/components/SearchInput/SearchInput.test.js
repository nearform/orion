import React from 'react'
import { useManualQuery } from 'graphql-hooks'
import { render, fireEvent, wait } from '@testing-library/react'
import { navigate } from '@reach/router'
import SearchInput from '.'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import theme from 'gatsby-theme-acme'

const queryResult = {
  data: null,
}
const mockQueryFn = jest.fn(() => {
  queryResult.data = {
    results: [
      {
        id: 1,
        title: 'test title',
        path: '/test/path/',
      },
    ],
  }
})

jest.mock('graphql-hooks')
useManualQuery.mockReturnValue([mockQueryFn, queryResult])

jest.mock('../../queries/base-search.graphql', () => 'base-search-query')

jest.mock('@reach/router', () => ({
  Link: jest.requireActual('@reach/router').Link,
  navigate: jest.fn(),
}))

const renderSearchInput = () =>
  render(
    <ThemeProvider theme={createMuiTheme(theme)}>
      <SearchInput placeholderText="test place holder" query="test-query" />
    </ThemeProvider>
  )

describe('Given I render the SearchInput component', () => {
  describe('When the component is untouched', () => {
    it("Then it doesn't show any suggestions", () => {
      const { container } = renderSearchInput()
      expect(container.querySelector('.MuiPaper-root')).not.toHaveClass(
        'visible'
      )
    })
  })
  describe('When I type in a search term that has no results', () => {
    it('shows the no results text', async () => {
      const { container, getByPlaceholderText, getByText } = renderSearchInput()
      useManualQuery.mockReturnValueOnce([
        mockQueryFn,
        {
          data: {
            results: [],
          },
        },
      ])
      fireEvent.change(getByPlaceholderText('test place holder'), {
        target: { value: 'no results test term' },
      })
      await wait(() => container.querySelector('.MuiPaper-root visible'))
      expect(getByText('No Results')).toBeInTheDocument()
    })
  })

  describe('When I type in a search term', () => {
    let form = null
    const results = [
      {
        id: 1,
        title: 'test title',
        path: '/test/path',
      },
      {
        id: 2,
        title: 'other title',
        path: '/other',
      },
      {
        id: 3,
        title: 'new title',
        path: '/wherever',
      },
    ]
    beforeEach(async () => {
      form = renderSearchInput()
      useManualQuery.mockReturnValueOnce([
        mockQueryFn,
        {
          data: {
            results,
          },
        },
      ])
      // We have to manually focus the input as it doesn't happen automatically as it would in the browser https://testing-library.com/docs/guide-events
      form.getByPlaceholderText('test place holder').focus()
      fireEvent.change(form.getByPlaceholderText('test place holder'), {
        target: {
          value: 'test term',
        },
      })
      await wait(() => form.container.querySelector('.MuiPaper-root visible'))
    })
    it('shows the relevent suggestions (mocked from the api)', async () => {
      const { getByText } = form

      expect(getByText('Top Hits')).toBeInTheDocument()

      results.forEach(({ title, path }) => {
        expect(getByText(title)).toHaveAttribute('href', path)
      })

      expect(getByText('More results')).toHaveAttribute(
        'href',
        '/search?term=test term'
      )
    })
    it('Then it shows the suggestions overlay', () => {
      const { container } = form
      expect(container.querySelector('.MuiPaper-root')).toHaveClass('visible')
    })

    describe('And I click one of the suggestions', () => {
      beforeEach(() => {
        const { getByText, container } = form

        expect(container.querySelector('.MuiPaper-root')).toHaveClass('visible')
        // We have to manually focus the input as it doesn't happen automatically as it would in the browser https://testing-library.com/docs/guide-events
        getByText('test title').focus()
        fireEvent.click(getByText('test title'))
      })
      it('Then it hides the results box', () => {
        const { container } = form
        expect(container.querySelector('.MuiPaper-root')).not.toHaveClass(
          'visible'
        )
      })
    })

    describe('And I submit the form', () => {
      it('Then it takes me to the search page with the correct term', () => {
        const { container } = form
        const input = container.querySelector('input')
        jest.spyOn(input, 'blur')
        fireEvent.click(container.querySelector('button'))

        expect(input.blur).toHaveBeenCalled()
        expect(navigate).toHaveBeenCalledWith('/search?term=test term')
      })
    })
  })
})
