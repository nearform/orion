import React from 'react'

import { fireEvent, render } from '@testing-library/react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Auth } from 'gatsby-plugin-orion-core/src/utils/amplify'

import theme from 'gatsby-theme-acme'
import Home from './home'

jest.mock('gatsby-plugin-orion-core/src/utils/amplify', () => ({
  Auth: {},
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
    const href = 'http://myedit.test.com'
    window.location = new URL(href)
    process.env.GATSBY_URL_VIEW = 'http://myview.test.com/'

    const { getByText } = renderComponent()
    fireEvent.click(getByText(/goto View/i))
    expect(window.location.href).toEqual('http://myview.test.com/')
  })
  it('navigates to localhost if ENV blank', () => {
    delete global.window.location
    const href = 'http://localhost:8001'
    window.location = new URL(href)
    process.env.GATSBY_URL_VIEW = ''

    const { getByText } = renderComponent()
    fireEvent.click(getByText(/goto View/i))
    expect(window.location.href).toEqual('http://localhost:8000/')
  })
  it('navigates to relative url', () => {
    delete global.window.location
    const href = 'http://edit.test.com'
    window.location = new URL(href)
    process.env.GATSBY_URL_VIEW = ''

    const { getByText } = renderComponent()
    fireEvent.click(getByText(/goto View/i))
    expect(window.location.href).toEqual('http://view.test.com/')
  })
})

describe('auto-magically navigates to view site if not authorised', () => {
  it('auto navigation to localhost if ENV blank', async () => {
    Auth.user = {}

    delete global.window.location
    const href = 'http://localhost:8001'
    window.location = new URL(href)
    process.env.GATSBY_URL_VIEW = ''

    setTimeout(() => {
      expect(window.location.href).toEqual('http://localhost:8000/login')
    }, 3000)
  })
})
