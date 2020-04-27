import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import EditComponent from '.'

jest.mock('@material-ui/core/Select', () => {
  const Select = ({ children, value, onChange, inputProps }) => {
    function handleChange() {
      onChange({ target: { value: 'NewComponentType' } })
    }

    return (
      <select
        data-testid="select"
        value={value}
        id={inputProps.id}
        onChange={handleChange}
      >
        {children}
      </select>
    )
  }

  return Select
})

const mockOnSave = jest.fn()
const mockProps = {
  foo: 'bar',
}
const mockPage = {
  baz: 'taz',
}
const renderComponent = () => {
  const props = {
    component: 'ArticleContent',
    isEditing: true,
    onSave: mockOnSave,
    page: mockPage,
    props: mockProps,
    handleSaveTags: jest.fn(),
  }
  return render(<EditComponent {...props} />)
}

describe('EditComponent', () => {
  describe('When changing the content type', () => {
    beforeEach(() => {
      const { getByLabelText } = renderComponent()

      fireEvent.change(getByLabelText('Select Component'))
    })
    it('passes the new name to the onSave prop', () => {
      expect(mockOnSave).toHaveBeenCalledWith(
        'NewComponentType',
        mockProps,
        mockPage
      )
    })
  })
})
