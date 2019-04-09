import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { navigate } from 'gatsby'
import { Auth } from 'aws-amplify'

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

  it('navigates to / when user is not authenticated', () => {
    shallow(<ProtectedRoute component={SecretComponent} />)

    expect(navigate).toBeCalledWith('/')
  })

  it('renders protected component when user is authenticated and no role specified', () => {
    Auth.user = {
      something: 'here',
    }

    const wrapper = shallow(<ProtectedRoute component={SecretComponent} />)

    expect(wrapper.find(SecretComponent).length).toBe(1)
  })

  it('navigates to / when user is authenticated but does not have the right role', () => {
    Auth.user = {
      signInUserSession: {
        idToken: {
          payload: {
            'https://hasura.io/jwt/claims': JSON.stringify({
              'x-hasura-allowed-roles': ['user'],
            }),
          },
        },
      },
    }

    shallow(<ProtectedRoute component={SecretComponent} role="admin" />)

    expect(navigate).toBeCalledWith('/')
  })

  it('renders protected component when user has the right role', () => {
    Auth.user = {
      signInUserSession: {
        idToken: {
          payload: {
            'https://hasura.io/jwt/claims': JSON.stringify({
              'x-hasura-allowed-roles': ['user'],
            }),
          },
        },
      },
    }

    const wrapper = shallow(
      <ProtectedRoute component={SecretComponent} role="user" />
    )

    expect(wrapper.find(SecretComponent).length).toBe(1)
  })
})
