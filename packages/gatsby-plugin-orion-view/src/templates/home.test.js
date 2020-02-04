import React from 'react'
import { renderUnauthenticated } from '../../test-utils'
import KnowledgeHome from './home'

// This test file is just a shell to get @testing-library/react setup.
// These mocks need fleshing out.
jest.mock('components', () => ({
  ...jest.requireActual('components'),
  GROUP_TYPES: {},
  useAuthorizedQuery: () => {
    return {
      data: {},
      loading: false,
      refetch: false,
    }
  },
}))
jest.mock('../components/SEO')
jest.mock('graphql-hooks', () => {
  return {
    useQuery: () => {
      return {
        loading: false,
        error: null,
        data: {},
      }
    },
    useManualQuery: () => {
      return [
        {},
        {
          data: {},
          loading: false,
        },
      ]
    },
  }
})

// These component mocks need removing and graphql data mocks creating.
jest.mock('../components/PromoSpot', () => () => 'PromoSpot')
jest.mock('../components/list/most-recent-articles', () => () =>
  'MostRecentArticles'
)
jest.mock('../components/list/event-list', () => () => 'EventList')

describe('<KnowledgeHome />', () => {
  test('Renders when not authenticated', () => {
    const { getByText } = renderUnauthenticated(<KnowledgeHome />)
    expect(getByText(`Gain knowledge from the world's leading organisations`))
  })

  test.todo('Write the rest of the tests for KnowledgeHome')
})
