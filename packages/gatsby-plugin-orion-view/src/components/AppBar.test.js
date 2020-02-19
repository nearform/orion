import React from 'react'
import { render } from '@testing-library/react'
import AppBar from './AppBar'

import HorizontalNavigationMenu from 'gatsby-plugin-orion-core/src/components/HorizontalNavigationMenu'

// Mock the components that are already tested
jest.mock(
  'gatsby-plugin-orion-core/src/components/HorizontalNavigationMenu',
  () => {
    return {
      __esModule: true,
      default: jest.fn(),
    }
  }
)

beforeEach(() => {
  jest.resetAllMocks()
  HorizontalNavigationMenu.mockImplementation(() => (
    <div data-testid="horz-nav-menu">HorizontalNavigationMenu</div>
  ))
})

describe('root menu items', () => {
  test('renders HorizontalNavigationMenu with forwarded props', () => {
    expect.assertions(3)

    const { getByTestId } = render(
      <AppBar
        menuData={['menu data']}
        dropDownIndicatorIcon="drop"
        childIndicatorIcon="child"
        userRole="role"
      />
    )

    expect(getByTestId('horz-nav-menu')).toBeInTheDocument()
    expect(HorizontalNavigationMenu).toHaveBeenCalled()
    const props = HorizontalNavigationMenu.mock.calls[0][0]
    expect(props).toEqual({
      data: ['menu data'],
      dropDownIndicatorIcon: 'drop',
      childIndicatorIcon: 'child',
      userRole: 'role',
    })
  })

  test('renders HorizontalNavigationMenu with defaults', () => {
    expect.assertions(3)

    const { getByTestId } = render(<AppBar menuData={[]} />)

    expect(getByTestId('horz-nav-menu')).toBeInTheDocument()
    expect(HorizontalNavigationMenu).toHaveBeenCalled()
    const props = HorizontalNavigationMenu.mock.calls[0][0]
    expect(props).toEqual({
      data: [],
      dropDownIndicatorIcon: 'fas fa-chevron-down',
      childIndicatorIcon: 'fas fa-chevron-right',
      userRole: undefined,
    })
  })

  test('renders brand logo image if src defined', () => {
    expect.assertions(2)

    const { getByAltText } = render(<AppBar brandImageSrc="src1" />)

    const img = getByAltText('brand logo')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'src1')
  })

  test('sets the href attribute when rendering the brand logo image', () => {
    expect.assertions(2)

    const { getByAltText } = render(
      <AppBar brandImageSrc="src1" brandTo="/dest1" />
    )

    const brandLink = getByAltText('brand logo').closest('a')
    expect(brandLink).toBeInTheDocument()
    expect(brandLink).toHaveAttribute('href', '/dest1')
  })

  // This should be tested in another component and mocked here
  test('renders language selector', () => {
    expect.assertions(2)

    const { getByRole } = render(<AppBar brandImageSrc="src1" />)

    const enMenuItem = getByRole('menuitem')
    expect(enMenuItem).toBeInTheDocument()
    expect(enMenuItem).toHaveAttribute('value', 'en')
  })
})
