import React from 'react'
import AdminDashboard from '../components/AdminDashboard'

const sideBarItems = [
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
const content = [
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
// TODO pull this name from the consuming application. i.e. acme
const heading = 'Acme'

export default function() {
  return (
    <AdminDashboard data={sideBarItems} heading={heading} content={content} />
  )
}
