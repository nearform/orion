import React from 'react'
import { render, within } from '@testing-library/react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import theme from 'gatsby-theme-acme'

import AdminDashboard from '.'

const mockData = [
  { label: 'Quick find', iconClass: 'fas fa-search', to: '/search' },
  {
    label: 'Pages',
    to: '/pages',
    iconClass: 'fas fa-file',
  },
  {
    label: 'Articles',
    to: '/articles',
    iconClass: 'fas fa-file-alt',
  },
  {
    label: 'Menus',
    to: '/menus',
    iconClass: 'fas fa-list-alt',
  },
  {
    label: 'Categories / Tags',
    to: '/tags',
    iconClass: 'fas fa-tag',
  },
  {
    label: 'Media Library',
    to: '/media',
    iconClass: 'fas fa-film',
  },
  {
    label: 'Users',
    to: '/users',
    iconClass: 'fas fa-users',
  },
  { label: 'Sign out', to: '/sign-out', iconClass: 'fas fa-arrow-left' },
]
const mockContent = [
  {
    label: 'Pages',
    to: '/pages',
    src: 'fas fa-file',
  },
  {
    label: 'Articles',
    to: '/articles',
    src: 'fas fa-file-alt',
  },
  {
    label: 'Menus',
    to: '/menus',
    src: 'fas fa-list-alt',
  },
  {
    label: 'Users',
    to: '/users',
    src: 'fas fa-users',
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
    expect(getByText('Menus')).toBeInTheDocument()
    expect(getByText('Categories / Tags')).toBeInTheDocument()
    expect(getByText('Media Library')).toBeInTheDocument()
    expect(getByText('Users')).toBeInTheDocument()
    expect(getByText('Sign out')).toBeInTheDocument()
  })

  it('renders a list of menu cards', () => {
    const { container } = renderComponent()
    const { getByText } = within(
      container.querySelector('[class^=makeStyles-main]')
    )
    expect(getByText('Pages')).toBeInTheDocument()
    expect(getByText('Articles')).toBeInTheDocument()
    expect(getByText('Menus')).toBeInTheDocument()
    expect(getByText('Users')).toBeInTheDocument()
  })
})
