import { Auth } from 'aws-amplify'

import { isAuthenticatedSync } from './auth'

beforeEach(() => {
  Auth.user = null
})

describe('auth', () => {
  describe('isAuthenticated', () => {
    it('should return false when user does not exist', () => {
      expect(isAuthenticatedSync()).toBe(false)
    })

    it('should return true when user exists', () => {
      Auth.user = {
        some: 'user',
      }

      expect(isAuthenticatedSync()).toBe(true)
    })
  })
})
