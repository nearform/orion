import { Auth } from 'aws-amplify'

import { isAuthenticated, getUserRoles, isAdmin } from './auth'

beforeEach(() => {
  Auth.user = null
})

describe('auth', () => {
  describe('isAuthenticated', () => {
    it('should return false when user does not exist', () => {
      expect(isAuthenticated()).toBe(false)
    })

    it('should return true when user exists', () => {
      Auth.user = {
        some: 'user',
      }

      expect(isAuthenticated()).toBe(true)
    })
  })

  describe('getUserRoles', () => {
    it('should return empty array when user is not authenticated', () => {
      expect(getUserRoles()).toEqual([])
    })

    it('should return empty array when user is authenticated but has no claims', () => {
      Auth.user = {
        some: 'user',
      }

      expect(getUserRoles()).toEqual([])
    })

    it('should return empty array when user is authenticated and has claims but no roles', () => {
      Auth.user = {
        signInUserSession: {
          idToken: {
            payload: {
              'https://hasura.io/jwt/claims': JSON.stringify({
                'x-hasura-allowed-roles': [],
              }),
            },
          },
        },
      }

      expect(getUserRoles()).toEqual([])
    })

    it('should return roles array when user is authenticated and has roles in claims', () => {
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

      expect(getUserRoles()).toEqual(['user'])
    })
  })

  describe('isAdmin', () => {
    it('should return true when user has admin role', () => {
      Auth.user = {
        signInUserSession: {
          idToken: {
            payload: {
              'https://hasura.io/jwt/claims': JSON.stringify({
                'x-hasura-allowed-roles': ['admin'],
              }),
            },
          },
        },
      }

      expect(isAdmin()).toBe(true)
    })
  })
})
