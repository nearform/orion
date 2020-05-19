import React from 'react'
import { render, within } from '@testing-library/react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import theme from 'gatsby-theme-acme'

import AdminDashboard from '.'
import { Auth } from 'gatsby-plugin-orion-core/src/utils/amplify'

jest.mock('gatsby-plugin-orion-core/src/utils/amplify', () => ({
  Auth: {},
  checkIfAuthenticated: () => jest.fn(),
}))
Auth.currentAuthenticatedUser = jest.fn().mockResolvedValue('not authenticated')

const mockData = [
  {
    label: 'Quick find',
    iconClass: 'fas fa-search',
    to: '/quick-find',
  },
  {
    label: 'Pages',
    to: '/pages/create',
    iconClass: 'fas fa-file',
  },
  {
    label: 'Articles',
    to: '/article/create',
    iconClass: 'fas fa-newspaper',
  },
  {
    label: 'Media Library',
    to: '/media-library',
    iconClass: 'fas fa-photo-video',
  },
  {
    label: 'goto View',
    to: '',
    iconClass: 'fas fa-eye',
    onClick: () => {},
  },
  {
    label: 'Sign out',
    to: '/sign-out',
    iconClass: 'fas fa-long-arrow-alt-left',
  },
]
const mockContent = [
  {
    label: 'Create Page',
    to: '/pages/create',
    Image: () => <div>mockPagesIcon</div>,
  },
  {
    label: 'Create Article',
    to: '/article/create',
    Image: () => <div>mockArticlesIcon</div>,
  },
]

const renderComponent = () =>
  render(
    <ThemeProvider theme={createMuiTheme(theme)}>
      <AdminDashboard data={mockData} content={mockContent} heading="test me" />
    </ThemeProvider>
  )

describe('AdminDashboard component', () => {
  it('renders a header', async () => {
    const { getByText } = renderComponent()
    expect(getByText('test me')).toBeInTheDocument()
  })
  it('renders a side bar with a list of links', async () => {
    const { container } = renderComponent()
    const { getByText } = within(
      container.querySelector('[class^=makeStyles-side]')
    )
    expect(getByText('Quick find')).toBeInTheDocument()
    expect(getByText('Pages')).toBeInTheDocument()
    expect(getByText('Articles')).toBeInTheDocument()
    expect(getByText('Media Library')).toBeInTheDocument()
    expect(getByText('goto View')).toBeInTheDocument()
    expect(getByText('Sign out')).toBeInTheDocument()
  })

  it('renders a list of menu cards', () => {
    const { container } = renderComponent()
    const { getByText } = within(
      container.querySelector('[class^=makeStyles-main]')
    )
    expect(getByText('Create Page')).toBeInTheDocument()
    expect(getByText('Create Article')).toBeInTheDocument()
  })
})
