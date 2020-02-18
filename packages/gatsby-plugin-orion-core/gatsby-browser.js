import React, { useEffect, useState } from 'react'
import AuthWrapper from './src/components/AuthWrapper'
import RootWrapper from './src/components/RootWrapper'
import { createMuiTheme } from '@material-ui/core/styles'
import { initGraphQLClient, makeGraphQLClient } from './src/utils/graphql'

import ThemeWrapper, { theme } from 'acme-admin-theme'

const client = makeGraphQLClient(process.env.GATSBY_GRAPHQL_API)
const muiTheme = createMuiTheme(theme.muiTheme)

const AuthInitWrapper = ({ element }) => {
  const [isAuthInitialized, setIsAuthInitialized] = useState(false)

  useEffect(() => {
    const init = async () => {
      await initGraphQLClient(client)
      setIsAuthInitialized(true)
    }

    init()
  }, [])

  return (
    <RootWrapper client={client} theme={muiTheme} ThemeWrapper={ThemeWrapper}>
      <AuthWrapper allowNoParentGroups isAuthInitialized={isAuthInitialized}>
        {element}
      </AuthWrapper>
    </RootWrapper>
  )
}

export const wrapRootElement = ({ element }) => (
  <AuthInitWrapper element={element} />
)
