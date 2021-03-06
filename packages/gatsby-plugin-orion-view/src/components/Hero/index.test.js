import React from 'react'
import { render } from '@testing-library/react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import theme from 'gatsby-theme-acme'

import Hero from '.'

test('renders search bar', () => {
  const testId = 'test'
  const searchInput = <div data-testid={testId} />

  const { getByTestId } = render(
    <ThemeProvider theme={createMuiTheme(theme)}>
      <Hero searchInput={searchInput} />
    </ThemeProvider>
  )

  const searchInputEl = getByTestId(testId)

  expect(searchInputEl).toBeInTheDocument()
})

test('background image can be set', () => {
  const expectedImageSrc = 'the-image.jpg'
  const { container } = render(
    <ThemeProvider theme={createMuiTheme(theme)}>
      <Hero imageSrc={expectedImageSrc} />
    </ThemeProvider>
  )

  // The background image should be set on the root of the grid
  const gridRootEl = container.querySelector('.MuiGrid-root')

  expect(gridRootEl).toHaveStyle({
    backgroundImage: `url(${expectedImageSrc})`,
  })
})
