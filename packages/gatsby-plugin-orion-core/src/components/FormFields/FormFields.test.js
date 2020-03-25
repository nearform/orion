import React from 'react'
import { render } from '@testing-library/react'
import { InputField } from '.'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import theme from 'gatsby-theme-acme'

jest.mock('aws-amplify')

const renderComponent = propOverrides => {
  const props = {
    name: 'test input',
    options: ['hello', 'test', 'person'],
    error: 'mock error string',
    value: 'hello',
    ...propOverrides,
  }
  return render(
    <ThemeProvider theme={createMuiTheme(theme)}>
      <InputField {...props}>mock label name</InputField>
    </ThemeProvider>
  )
}

describe('InputField component', () => {
  describe('When the type prop is "select"', () => {
    it('composes a select component', () => {
      const { container } = renderComponent({ type: 'select' })
      expect(container).toMatchSnapshot()
    })
  })
  describe('When the type prop is "image"', () => {
    it('composes a select component', () => {
      const props = {
        path: '/a/path/to/test.jpg',
        value: 'mock value',
        aspectRatio: 1.333,
        onChange: jest.fn(),
        onUpload: jest.fn(),
        isBoxAlwaysShown: false,
        children: jest.fn(),
        isAutoFileNameEnabled: false,
      }
      const { container } = renderComponent(props)
      expect(container).toMatchSnapshot()
    })
  })
  describe('When the type prop is "tags"', () => {
    it('composes a the TagsSelect component', () => {
      const { container } = renderComponent({ type: 'tags' })
      expect(container).toMatchSnapshot()
    })
  })
})
