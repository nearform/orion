import React from 'react'
import { render, within } from '@testing-library/react'
import PageSettings from '.'
import * as mui from '@material-ui/pickers'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import theme from 'gatsby-theme-acme'

jest.spyOn(mui, 'DateTimePicker')

describe('PageSettings', () => {
  it('should use the date time picker from mui with the correct settings', async () => {
    const publishedDate = '2020-04-07T10:20:30Z'
    const props = {
      open: true,
      onCancel: jest.fn(),
      onSave: jest.fn(),
      page: {
        published: publishedDate,
        show_in_menu: true, // eslint-disable-line camelcase
        path: '/',
        layout: 'mock',
      },
    }
    render(
      <ThemeProvider theme={createMuiTheme(theme)}>
        <PageSettings {...props} />
      </ThemeProvider>
    )
    const { getByText } = within(document.querySelector('.MuiDialog-root'))

    expect(
      document.querySelector('[format="MMM dd yyyy, hh:mm a"]')
    ).toBeInTheDocument()
    expect(getByText('Published Date').nextSibling.childNodes[0]).toHaveValue(
      'Apr 07 2020, 11:20 AM'
    )
  })
})
