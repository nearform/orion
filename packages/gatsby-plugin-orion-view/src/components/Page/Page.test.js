import React from 'react'
import Page from '.'
import { render } from '@testing-library/react'
import { useQuery } from 'graphql-hooks'
import { navigate } from '@reach/router'
import { useViewComponents } from '../ViewComponentProvider'

jest.mock('../../queries/get-page.graphql', () => '')
jest.mock('graphql-hooks')
useQuery.mockReturnValue({
  data: null,
  loading: false,
})
jest.mock('@reach/router')
jest.mock('../ViewComponentProvider')
useViewComponents.mockReturnValue({ components: {}, layouts: {} })

const props = {
  location: {},
  pageContext: {
    page: {
      ancestrey: [],
    },
  },
}
const renderComponent = newProps => render(<Page {...props} {...newProps} />)

describe('Page component', () => {
  let component
  describe('When there is no page', () => {
    beforeEach(() => {
      component = renderComponent({ pageContext: { page: null } })
    })
    it('redirects to the 404 page', () => {
      expect(navigate).toHaveBeenCalledWith('/_not_found')
    })
  })
  describe('When the page is a 404', () => {
    beforeEach(() => {
      component = renderComponent({
        pageContext: {
          page: {
            ncestry: [],
            is4xx: true,
            errorCode: 404,
            message: "We can't find the article you're looking for.",
            title: 'Not found.',
          },
        },
      })
    })
    it('shows a title', () => {
      const { getByText } = component
      expect(getByText('Not found.')).toBeInTheDocument()
    })
    it('shows a message', () => {
      const { getByText } = component
      expect(
        getByText(/We can't find the article you're looking for./)
      ).toBeInTheDocument()
    })

    it('shows the error code', () => {
      const { getByText } = component
      expect(getByText(/404/)).toBeInTheDocument()
    })
  })

  describe('When there is no static page', () => {
    describe('And the dynamic page is still loading', () => {
      beforeEach(() => {
        useQuery.mockReturnValueOnce({
          data: null,
          loading: true,
        })
        component = renderComponent({ pageContext: { page: null } })
      })
      it('shows a loading message', () => {
        const { getByText } = component
        expect(getByText('Loading')).toBeInTheDocument()
      })
    })
  })

  describe('When there is no layout component to match the layout string returned from the DB', () => {
    beforeEach(() => {
      useViewComponents.mockReturnValue({
        components: {},
        layouts: {
          layoutOne: () => <p>wont get found</p>,
        },
      })
      component = renderComponent({
        pageContext: { page: { layout: 'layoutTwo' } },
      })
    })
    it('renders null', () => {
      const { container } = component

      expect(container.firstChild).toBe(null)
    })
  })
})
