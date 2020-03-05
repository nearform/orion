import React from 'react'
import { render } from '@testing-library/react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import HomePageHero from './HomePageHero'

test('renders search bar', () => {
  const { getByPlaceholderText } = render(
    <ThemeProvider
      theme={createMuiTheme({ palette: { tertiary: {}, common: {} } })}
    >
      <HomePageHero />
    </ThemeProvider>
  )

  const searchInputEl = getByPlaceholderText('Search Acme')

  expect(searchInputEl).toBeInTheDocument()
})
