import React from 'react'
import { fireEvent, render, within } from '@testing-library/react'
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
    onClick: () => {
      const hasCustomUrl =
        process.env &&
        process.env.GATSBY_URL_VIEW !== undefined &&
        process.env.GATSBY_URL_VIEW.length > 0

      if (hasCustomUrl) {
        window.location.href = process.env.GATSBY_URL_VIEW
      } else if (!hasCustomUrl) {
        const bit = window.location.hostname.split('.')[0]
        switch (bit) {
          case 'localhost':
            window.location.href = 'http://localhost:8000'
            break
          case 'edit': {
            const { origin } = window.location
            const idx = origin.indexOf('edit')
            const remainder = origin.slice(idx + 4)
            window.location.href = `${origin.slice(0, idx)}view${remainder}`
            break
          }

          default:
            console.error('no URL_VIEW set in environment variables')
        }
      }
    },
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
    to: '/pages',
    src: 'todo',
  },
  {
    label: 'Articles',
    to: '/articles',
    src: 'todo',
  },
  {
    label: 'Menus',
    to: '/menus',
    src: 'todo',
  },
  {
    label: 'Users',
    to: '/users',
    src: 'todo',
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

  it('navigates to a custom url', () => {
    delete global.window.location
    const href = 'http://myedit.test.com'
    window.location = new URL(href)
    process.env.GATSBY_URL_VIEW = 'http://myview.test.com/'

    const { getByText } = renderComponent()
    fireEvent.click(getByText(/goto View/i))
    expect(window.location.href).toEqual('http://myview.test.com/')
  })

  it('navigates to localhost if ENV blank', () => {
    delete global.window.location
    const href = 'http://localhost:8001'
    window.location = new URL(href)
    process.env.GATSBY_URL_VIEW = ''

    const { getByText } = renderComponent()
    fireEvent.click(getByText(/goto View/i))
    expect(window.location.href).toEqual('http://localhost:8000/')
  })

  it('navigates to relative url', () => {
    delete global.window.location
    const href = 'http://edit.test.com'
    window.location = new URL(href)
    process.env.GATSBY_URL_VIEW = ''

    const { getByText } = renderComponent()
    fireEvent.click(getByText(/goto View/i))
    expect(window.location.href).toEqual('http://view.test.com/')
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

  it('uses the MUI theme components and classes to style the page', () => {
    const { container } = renderComponent()
    expect(container).toMatchSnapshot()
  })
})
