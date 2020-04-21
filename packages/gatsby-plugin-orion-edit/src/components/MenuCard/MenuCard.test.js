import React from 'react'

import MenuCard from '.'
import { render } from '@testing-library/react'

const MockImage = () => <div>mock image</div>

const renderComponent = () =>
  render(<MenuCard Image={MockImage} label="Test Item" to="me" />)

describe('MenuCard component', () => {
  it('renders a text label', () => {
    const { getByText } = renderComponent()
    expect(getByText('Test Item')).toBeInTheDocument()
  })
  it('renders the image component from props', () => {
    const { getByText } = renderComponent()
    expect(getByText('mock image')).toBeInTheDocument()
  })
})
