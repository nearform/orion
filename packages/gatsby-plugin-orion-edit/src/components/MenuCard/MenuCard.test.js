import React from 'react'

import MenuCard from '.'
import { render } from '@testing-library/react'

const renderComponent = () =>
  render(<MenuCard src="test.jpg" text="Test Item" />)
describe('MenuCard component', () => {
  it("renders the text it's passed", () => {
    const { getByText } = renderComponent()
    expect(getByText('Test Item')).toBeInTheDocument()
  })
  it('renders an image with the src and alt attributes', () => {
    const { container } = renderComponent()
    expect(container.querySelector('img')).toMatchInlineSnapshot(`
      <img
        alt="Menu icon for Test Item"
        src="test.jpg"
      />
    `)
  })
})
