import React from 'react'
import { render, within } from '@testing-library/react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import theme from 'gatsby-theme-acme'

import AdminDashboard from '.'

const mockData = [
  {
    label: 'Quick find',
    iconClass: 'fas fa-search',
    to: '/quick-find',
  },
  {
    label: 'Pages',
    to: '/pages',
    iconClass: 'fas fa-file',
  },
  {
    label: 'Articles',
    to: '/articles',
    iconClass: 'fas fa-newspaper',
  },
  {
    label: 'Menus',
    to: '/menus',
    iconClass: 'fas fa-list-alt',
  },
  {
    label: 'Categories / Tags',
    to: '/categories',
    iconClass: 'fas fa-tag',
  },
  {
    label: 'Media Library',
    to: '/media-library',
    iconClass: 'fas fa-photo-video',
  },
  {
    label: 'Users',
    to: '/users',
    iconClass: 'fas fa-user-friends',
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
    label: 'Pages',
    to: '/pages/create',
    Image: () => <div>mockPagesIcon</div>,
  },
  {
    label: 'Articles',
    to: '/pages/create',
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
    expect(getByText('Menus')).toBeInTheDocument()
    expect(getByText('Categories / Tags')).toBeInTheDocument()
    expect(getByText('Media Library')).toBeInTheDocument()
    expect(getByText('Users')).toBeInTheDocument()
    expect(getByText('goto View')).toBeInTheDocument()
    expect(getByText('Sign out')).toBeInTheDocument()
  })

  it('renders a list of menu cards', () => {
    const { container } = renderComponent()
    const { getByText } = within(
      container.querySelector('[class^=makeStyles-main]')
    )
    expect(getByText('Pages')).toBeInTheDocument()
    expect(getByText('Articles')).toBeInTheDocument()
  })
})
