import React from 'react'

import MenuCard from '.'
import { render } from '@testing-library/react'

const renderComponent = () =>
  render(<MenuCard src="test.jpg" label="Test Item" to="me" />)

describe('MenuCard component', () => {
  it("renders the label it's passed", () => {
    const { getByText } = renderComponent()
    expect(getByText('Test Item')).toBeInTheDocument()
  })
  it('renders an image with the src and alt attributes', () => {
    const { getByTitle } = renderComponent()
    expect(getByTitle('Test Item')).toMatchInlineSnapshot(`
      <div
        class="MuiCardMedia-root makeStyles-media-85"
        style="background-image: url(test.jpg);"
        title="Test Item"
      />
    `)
  })
})
