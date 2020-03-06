import React from 'react'
import { render } from '@testing-library/react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import Hero from '.'

test('renders search bar', () => {
  const { getByPlaceholderText } = render(
    <ThemeProvider
      theme={createMuiTheme({ palette: { tertiary: {}, common: {} } })}
    >
      <Hero />
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
      <Hero imageSrc={expectedImageSrc} />
    </ThemeProvider>
  )

  // The background image should be set on the root of the grid
  const gridRootEl = container.querySelector('.MuiGrid-root')

  expect(gridRootEl).toHaveStyle({
    backgroundImage: `url(${expectedImageSrc})`,
  })
})
