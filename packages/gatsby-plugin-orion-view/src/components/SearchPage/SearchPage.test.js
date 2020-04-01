import React from 'react'
import { render, cleanup } from '@testing-library/react'
import SearchPage from '.'
import { useQuery } from 'graphql-hooks'
import { useViewComponents } from '../ViewComponentProvider'

const results = [
  { id: 14, title: 'About', path: '/about' },
  {
    id: 22,
    title: 'A discussion about insurability',
    path: '/latest-news/insurability',
  },
  {
    id: 3,
    title: 'Everything you need to know about insurance',
    path: '/latest-news/about-insurance',
  },
]

jest.mock(
  'gatsby-plugin-orion-core/src/queries/base-search.graphql',
  () => 'mutation'
)

jest.mock('graphql-hooks')
useQuery.mockReturnValue({
  data: {
    results,
  },
  loading: false,
})

jest.mock('../ViewComponentProvider')
useViewComponents.mockReturnValue({
  layouts: {
    section: ({ main }) => <div>{main}</div>,
  },
})

const mockSearchTerm = 'test this'
const setupPage = ({ queryString = `?term=${mockSearchTerm}` } = {}) =>
  render(
    <SearchPage
      location={{
        pathname: '/search',
        search: queryString,
        hash: '',
        href: 'http://localhost:8000/search?term=abou',
        origin: 'http://localhost:8000',
        protocol: 'http:',
        host: 'localhost:8000',
        hostname: 'localhost',
        port: '8000',
        state: null,
        key: 'initial',
      }}
      pageContext={{
        page: {
          layout: 'section',
        },
      }}
    />
  )

describe('SearchPage component', () => {
  it('shows a title with the search term', () => {
    const { getByText } = setupPage()
    const regexp = new RegExp(mockSearchTerm)
    expect(getByText(regexp)).toBeInTheDocument()
  })

  it('correctly takes the search term from the query string', () => {
    const cases = [
      `?term=${mockSearchTerm}`,
      `?abc=123&term=${mockSearchTerm}`,
      `?term=${mockSearchTerm}&abc=123`,
      `?term2=stuff&term=${mockSearchTerm}&abc=123`,
    ]
    cases.forEach(queryString => {
      const { getByText } = setupPage({ queryString })
      const regexp = new RegExp(mockSearchTerm)
      expect(getByText(regexp)).toBeInTheDocument()
      cleanup()
    })
  })

  it('shows the correct number of results', () => {
    const { container } = setupPage()
    expect(container.querySelectorAll('article').length).toEqual(3)
  })

  it('shows the results in rows', () => {
    const { container } = setupPage()
    expect(container.querySelector('article')).toHaveAttribute(
      'class',
      expect.stringMatching(
        /MuiGrid-root makeStyles-root-\d{2,} MuiGrid-container MuiGrid-spacing-xs-3 MuiGrid-item MuiGrid-grid-xs-12/
      )
    )
    expect(container.querySelector('article')).not.toHaveAttribute(
      'class',
      expect.stringMatching(
        /MuiGrid-root makeStyles-root-\d{2,} MuiGrid-container MuiGrid-item MuiGrid-direction-xs-column MuiGrid-grid-xs-12 MuiGrid-grid-sm-12/
      )
    )
    expect(container.querySelector('article')).not.toHaveAttribute(
      'class',
      expect.stringMatching(
        /MuiGrid-root makeStyles-root-\d{2,} MuiGrid-container MuiGrid-item/
      )
    )
  })
})
