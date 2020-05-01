import React from 'react'
import { render, within } from '@testing-library/react'
import Layout from '.'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import theme from 'gatsby-theme-acme'

jest.mock('../PageTree', () => {
  const PageTree = () => <div>page tree mock</div>
  return PageTree
})

const mockSetPath = jest.fn()

const renderComponent = () => {
  const props = {
    action: <div>mockEditButtons</div>,
    ancestry: [
      { ancestor: { path: '/parent-path' }, direct: false },
      { ancestor: { path: '/parent-path/full' }, direct: true },
    ],
    setPath: mockSetPath,
    path: 'somewhere-here',
  }
  return render(
    <ThemeProvider theme={createMuiTheme(theme)}>
      <Layout {...props}>
        <div>children</div>
      </Layout>
    </ThemeProvider>
  )
}

describe('Layout component', () => {
  let layout
  beforeEach(() => {
    layout = renderComponent()
  })

  it('composes the PageTree in the side bar', () => {
    const { container } = layout

    const { getByText } = within(
      container.querySelector('[class^=makeStyles-side]')
    )
    expect(getByText('page tree mock')).toBeInTheDocument()
  })
  it('composes the action in the top section', () => {
    const { container } = layout

    const { getByText } = within(
      container.querySelector('[class^=makeStyles-top]')
    )
    expect(getByText('mockEditButtons')).toBeInTheDocument()
  })
  it('composes the children in the content section', () => {
    const { container } = layout

    const { getByText } = within(
      container.querySelector('[class^=makeStyles-content]')
    )
    expect(getByText('children')).toBeInTheDocument()
  })
})
