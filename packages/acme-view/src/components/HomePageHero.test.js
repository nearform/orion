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

test('background image can be set', () => {
  const expectedImageSrc = 'the-image.jpg'
  const { container } = render(
    <ThemeProvider
      theme={createMuiTheme({ palette: { tertiary: {}, common: {} } })}
    >
      <HomePageHero imageSrc={expectedImageSrc} />
    </ThemeProvider>
  )

  // The background image should be set on the root of the grid
  const gridRootEl = container.querySelector('.MuiGrid-root')

  expect(gridRootEl).toHaveStyle({
    backgroundImage: `url(${expectedImageSrc})`,
  })
})
