import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { navigate } from '@reach/router'
import { Auth } from 'gatsby-plugin-orion-core/src/utils/amplify'
import AuthButton from '.'

jest.mock('@reach/router', () => ({
  navigate: jest.fn(),
}))

jest.mock('gatsby-plugin-orion-core/src/utils/amplify', () => ({
  Auth: {},
}))

const renderComponent = () => render(<AuthButton />)

describe('Sign in button', () => {
  it('shows text Sign In', () => {
    Auth.user = null

    const { queryByText } = renderComponent()
    expect(queryByText(/sign in/i)).toBeTruthy()
  })
  it('click: navigates app to /login', () => {
    const { getByText } = renderComponent()
    fireEvent.click(getByText(/sign in/i))
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/login')
  })
})

describe('Sign out button', () => {
  it('shows text Sign Out', () => {
    Auth.user = {}

    const { queryByText } = renderComponent()
    expect(queryByText(/sign out/i)).toBeTruthy()
  })
  it('click: calls signOut and navigates to /', () => {
    Auth.signOut = jest.fn()

    const { getByText } = renderComponent()
    fireEvent.click(getByText(/sign out/i))
    expect(Auth.signOut).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/')
  })
})
