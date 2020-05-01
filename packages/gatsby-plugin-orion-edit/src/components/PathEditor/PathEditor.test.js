import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import PathEditor from '.'
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
      <PathEditor {...props}>
        <div>children</div>
      </PathEditor>
    </ThemeProvider>
  )
}

describe('PathEditor component', () => {
  it('shows a path input field to allow a user to change the path for the current page', () => {
    const { getByLabelText } = renderComponent()
    const input = getByLabelText(/Path:/i)
    expect(input).toBeInTheDocument()
  })

  it('uses the path as the value of the input', () => {
    const { getByLabelText } = renderComponent()
    const input = getByLabelText(/Path:/i)
    expect(input).toHaveValue('somewhere-here')
  })

  it('shows the parents parts of the path', () => {
    const { getByText } = renderComponent()
    expect(getByText('/parent-path/full')).toBeInTheDocument()
  })

  describe('When I edit the path', () => {
    let layout
    const event = {
      target: {
        value: 'stuff',
      },
    }
    beforeEach(() => {
      layout = renderComponent()
      const { getByLabelText } = layout
      fireEvent.change(getByLabelText(/path/i), event)
    })

    it('uses update path as the change handler', () => {
      expect(mockSetPath).toHaveBeenCalledWith('stuff')
    })
  })
})
