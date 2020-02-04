// Setup file for React Testing Library integration tests
// - see https://testing-library.com/docs/react-testing-library/setup
import React from 'react'
import '@testing-library/jest-dom/extend-expect' // eslint-disable-line import/no-unassigned-import
import { render } from '@testing-library/react'
import { AuthContext } from 'components'

const AllTheProviders = ({ children, isAuthenticated }) => {
  return (
    <AuthContext.Provider
      value={{
        getUserTokenData: () => ({
          isAuthenticated,
        }),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const renderUnauthenticated = (ui, options) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders isAuthenticated={false}>{children}</AllTheProviders>
    ),
    ...options,
  })
}

const renderAuthenticated = (ui, options) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders isAuthenticated>{children}</AllTheProviders>
    ),
    ...options,
  })
}

// Re-export everything
export * from '@testing-library/react'

// Override render method
export { renderUnauthenticated, renderAuthenticated }
