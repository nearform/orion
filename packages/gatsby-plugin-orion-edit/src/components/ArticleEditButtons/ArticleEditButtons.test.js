import React from 'react'
import ArticleEditButtons from '.'
import { render } from '@testing-library/react'
import * as mui from '@material-ui/pickers'

jest.spyOn(mui, 'DateTimePicker')

const mockDate = new Date('2020-03-09T13:05:20.588+00:00')
const mockSetPath = jest.fn()

const renderComponent = () => {
  const props = {
    isEditing: true,
    onEdit: jest.fn(),
    onPreview: jest.fn(),
    onSave: jest.fn(),
    onSettings: jest.fn(),
    publishedDate: mockDate,
    setPublishedDate: jest.fn(),
    expiresDate: null,
    setExpiresDate: jest.fn(),
    ancestry: [
      { ancestor: { path: '/parent-path' }, direct: false },
      { ancestor: { path: '/parent-path/full' }, direct: true },
    ],
    setPath: mockSetPath,
    path: 'somewhere-here',
  }
  return render(<ArticleEditButtons {...props} />)
}

describe('ArticleEditButtons component', () => {
  it('renders a publish date picker with the correct props', () => {
    renderComponent()
    expect(mui.DateTimePicker.mock.calls[0]).toEqual([
      {
        id: 'published-date-picker',
        InputProps: {
          className: expect.stringContaining(
            'makeStyles-published-date-input-'
          ),
        },
        autoOk: true,
        ampm: false,
        emptyLabel: 'Now',
        format: 'MMM dd yyyy, hh:mm a',
        onChange: expect.any(Function),
        orientation: 'portrait',
        value: mockDate,
        variant: 'dialog',
        maxDate: null,
        showTodayButton: true,
        DialogProps: {
          className: expect.stringContaining('makeStyles-dialog-wrapper-'),
        },
      },
      {},
    ])
  })
  it('renders an expiry date picker with the correct props', () => {
    renderComponent()
    expect(mui.DateTimePicker.mock.calls[1]).toEqual([
      {
        InputLabelProps: {
          className: expect.stringContaining('makeStyles-expires-date-label-'),
        },
        classes: {
          root: expect.stringContaining('makeStyles-expires-date-root-'),
        },
        id: 'expires-date-picker',
        minDate: mockDate,
        label: 'Expires:',
        autoOk: true,
        ampm: false,
        InputProps: {
          className: expect.stringContaining('makeStyles-expires-date-input-'),
        },
        emptyLabel: 'Never',
        format: 'MMM dd yyyy',
        onChange: expect.any(Function),
        orientation: 'portrait',
        value: null,
        variant: 'dialog',
        clearable: true,
        DialogProps: {
          className: expect.stringContaining('makeStyles-dialog-wrapper-'),
        },
      },
      {},
    ])
  })
})
