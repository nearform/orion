import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Auth } from 'gatsby-plugin-orion-core/src/utils/amplify'

import theme from 'gatsby-theme-acme'
import Home from './home'

jest.mock('gatsby-plugin-orion-core/src/utils/amplify', () => ({
  Auth: {},
  checkIfAuthenticated: () => jest.fn(),
}))
Auth.currentAuthenticatedUser = jest.fn().mockResolvedValue('not authenticated')

const renderComponent = () =>
  render(
    <ThemeProvider theme={createMuiTheme(theme)}>
      <Home />
    </ThemeProvider>
  )

describe('test dynamic "goto View" button click functionality in home.js', () => {
  it('renders goto View button', async () => {
    const { getByText } = renderComponent()
    expect(getByText(/goto View/i)).toBeInTheDocument()
  })
  it('navigates to a custom url', () => {
    delete global.window.location
    const href = 'http://myedit.com'
    window.location = new URL(href)
    process.env.GATSBY_URL_VIEW = 'http://myview.com/'

    const { getByText } = renderComponent()
    fireEvent.click(getByText(/goto View/i))
    expect(window.location.href).toEqual('http://myview.com/')
  })
  it('navigates to missing route if empty ENV var', () => {
    delete global.window.location
    const href = 'http://myedit.com'
    window.location = new URL(href)
    process.env.GATSBY_URL_VIEW = ''

    const { getByText } = renderComponent()
    fireEvent.click(getByText(/goto View/i))

    setTimeout(() => {
      expect(window.location.href).toEqual('http://myedit.com/missing-route')
    }, 3000)
  })
})

describe('User tries to view edit site when not logged in', () => {
  it('so is redirected to /default401 if not ENV URL for View not set', async () => {
    Auth.user = {}

    delete global.window.location
    const href = 'http://anyurl.com'
    window.location = new URL(href)
    process.env.GATSBY_URL_VIEW = ''

    setTimeout(() => {
      expect(window.location.href).toEqual('http://myedit.com/default401')
    }, 3000)
  })
})

describe('User tries to view edit site when not logged in', () => {
  it('so is auto-magically navigated to View url within ENV vars', async () => {
    Auth.user = {}

    process.env.GATSBY_URL_VIEW = 'http://anotherurl.com'
    delete global.window.location
    const href = 'http://anyurl.com'
    window.location = new URL(href)

    setTimeout(() => {
      expect(window.location.href).toEqual('http://anotherurl.com/login')
    }, 3000)
  })
})
