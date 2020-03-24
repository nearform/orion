import React from 'react'
import AdminDashboard from '../components/AdminDashboard'

const data = [
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
const content = [
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

export default function() {
  return <AdminDashboard data={data} heading="Acme" content={content} />
}
