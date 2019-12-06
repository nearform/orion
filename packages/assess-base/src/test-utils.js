// Setup file for React Testing Library integration tests
// - see https://testing-library.com/docs/react-testing-library/setup
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { AuthContext } from 'components'

const defaultUserToken = {
  isAuthenticated: false,
  isAdmin: false,
  isContributor: false,
  userId: null,
  groupId: null,
}

const authenticatedUserToken = {
  isAuthenticated: true,
  isAdmin: false,
  isContributor: true,
  userId: 1,
  groupId: 1,
}

const authenticatedAdminToken = {
  isAuthenticated: true,
  isAdmin: true,
  isContributor: true,
  userId: 1,
  groupId: 1,
}

const AllTheProviders = ({ children, userToken, role }) => {
  return (
    <AuthContext.Provider
      value={{
        getUserTokenData: () => userToken,
        getUserAuth: requiredRole => requiredRole === role,
        isAuthInitialized: true,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const renderUnauthenticated = (ui, options) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders userToken={defaultUserToken}>{children}</AllTheProviders>
    ),
    ...options,
  })
}
const renderAuthenticated = (ui, options) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders userToken={authenticatedUserToken} role="member">
        {children}
      </AllTheProviders>
    ),
    ...options,
  })
}

const renderAuthenticatedPlatformAdmin = (ui, options) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders
        userToken={authenticatedAdminToken}
        role="platform-admin"
      >
        {children}
      </AllTheProviders>
    ),
    ...options,
  })
}

const renderAuthenticatedPartnerAdmin = (ui, options) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders userToken={authenticatedAdminToken} role="partner-admin">
        {children}
      </AllTheProviders>
    ),
    ...options,
  })
}

// Circleci will fail without this
jest.mock('./utils/date', () => require('./utils/__mock__/date'))

// re-export everything
export * from '@testing-library/react'

// override render method
export {
  renderUnauthenticated as render,
  renderAuthenticated,
  renderAuthenticatedPlatformAdmin,
  renderAuthenticatedPartnerAdmin,
}
