import React from 'react'
import { render } from '@testing-library/react'
import ErrorMessage from '.'

const renderComponent = () =>
  render(
    <ErrorMessage title="mock title" errorCode={123} message="mock message" />
  )

describe('ErrorMessage component', () => {
  let component
  beforeEach(() => {
    component = renderComponent()
  })
  it('shows a title', () => {
    const { getByText } = component
    expect(getByText('mock title')).toBeInTheDocument()
  })

  it('shows a message', () => {
    const { getByText } = component
    expect(getByText(/mock message/)).toBeInTheDocument()
  })

  it('shows the error code', () => {
    const { getByText } = component
    expect(getByText(/123/)).toBeInTheDocument()
  })
})
