import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import { Auth } from 'aws-amplify'
import { Redirect } from '@reach/router'
import { AuthInitContext } from 'components/auth'
import ProtectedRoute from './ProtectedRoute'

function SecretComponent() {
  return null
}

beforeEach(() => {
  Auth.user = null
})

describe('ProtectedRoute', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ProtectedRoute component={SecretComponent} />)

    expect(tree).toBeDefined()
  })

  it('renders a component that redirects to /auth when user is not authenticated', () => {
    const wrapper = mount(
      <AuthInitContext.Provider value={true}>
        <ProtectedRoute component={SecretComponent} />
      </AuthInitContext.Provider>
    )
    const redirect = wrapper.find(Redirect)

    expect(redirect.length).toBe(1)
    expect(redirect.props().to).toBe('/auth')
  })

  it('renders protected component when user is authenticated and no role specified', () => {
    Auth.user = {
      something: 'here',
    }

    const wrapper = mount(
      <AuthInitContext.Provider value={true}>
        <ProtectedRoute component={SecretComponent} />
      </AuthInitContext.Provider>
    )

    expect(wrapper.find(SecretComponent).length).toBe(1)
  })

  it('renders a component that redirects to /auth when user is authenticated but does not have the right role', () => {
    Auth.user = {
      signInUserSession: {
        idToken: {
          payload: {
            'https://hasura.io/jwt/claims': JSON.stringify({
              'x-hasura-allowed-roles': ['user'],
              'x-hasura-default-role': 'user',
            }),
          },
        },
      },
    }

    const wrapper = mount(
      <AuthInitContext.Provider value={true}>
        <ProtectedRoute component={SecretComponent} allowedRole={'admin'} />
      </AuthInitContext.Provider>
    )

    const redirect = wrapper.find(Redirect)

    expect(redirect.length).toBe(1)
    expect(redirect.props().to).toBe('/auth')
  })

  it('renders protected component when user has the right role', () => {
    Auth.user = {
      signInUserSession: {
        idToken: {
          payload: {
            'https://hasura.io/jwt/claims': JSON.stringify({
              'x-hasura-allowed-roles': ['admin'],
              'x-hasura-default-role': 'admin',
              'x-hasura-group-id': null,
            }),
            'x-raw-salmon-claims': JSON.stringify({
              'x-assess-base-contributor': false,
              'x-assess-base-assessor': false,
            }),
          },
        },
      },
    }

    const wrapper = mount(
      <AuthInitContext.Provider value={true}>
        <ProtectedRoute component={SecretComponent} allowedRole={'admin'} />
      </AuthInitContext.Provider>
    )

    expect(wrapper.find(SecretComponent).length).toBe(1)
  })
})
