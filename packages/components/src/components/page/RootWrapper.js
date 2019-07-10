import React from 'react'
import T from 'prop-types'

function RootWrapper({
  children,
  client,
  ClientContext,
  ThemeProvider,
  ThemeWrapper,
  CssBaseline,
  muiTheme,
}) {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ThemeWrapper>
        <ClientContext.Provider value={client}>
          {children}
        </ClientContext.Provider>
      </ThemeWrapper>
    </ThemeProvider>
  )
}

RootWrapper.propTypes = {
  children: T.node.isRequired,
  client: T.object.isRequired,
  ClientContext: T.object.isRequired,
  ThemeProvider: T.elementType.isRequired,
  ThemeWrapper: T.elementType.isRequired,
  CssBaseline: T.elementType.isRequired,
  muiTheme: T.object.isRequired,
}

export default RootWrapper
