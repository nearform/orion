import React from 'react'
import AdminDashboard from '../components/AdminDashboard'
import ArticlesIcon from '../components/SvgIcons/drawing-woman.inline.svg'
import PagesIcon from '../components/SvgIcons/support-notes.inline.svg'

import { Auth } from 'gatsby-plugin-orion-core/src/utils/amplify'
import { navigate } from '@reach/router'

const gotoNewUrl = (newSub, localPath) => {
  newSub = newSub.toLowerCase()
  localPath = (localPath && localPath.toLowerCase()) || ''

  const hasCustomUrl =
    process.env.GATSBY_URL_VIEW !== undefined &&
    process.env.GATSBY_URL_VIEW.length > 0
  if (hasCustomUrl) {
    window.location.href = `${process.env.GATSBY_URL_VIEW}${localPath}`
  } else if (newSub === '/login') {
    navigate('/default401')
  } else {
    navigate('/missing-route')
  }
}

const sideBarItems = [
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
    to: '/pages/create/',
    iconClass: 'fas fa-newspaper',
  },
  // {
  //   label: 'Menus',
  //   to: '/menus',
  //   iconClass: 'fas fa-list-alt',
  // },
  // {
  //   label: 'Categories / Tags',
  //   to: '/categories',
  //   iconClass: 'fas fa-tag',
  // },
  {
    label: 'Media Library',
    to: '/media-library',
    iconClass: 'fas fa-photo-video',
  },
  // {
  //   label: 'Users',
  //   to: '/users',
  //   iconClass: 'fas fa-user-friends',
  // },
  {
    label: 'goto View',
    to: '',
    iconClass: 'fas fa-eye',
    onClick: () => {
      gotoNewUrl('view')
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
    to: '/pages/create',
    Image: PagesIcon,
  },
  {
    label: 'Articles',
    to: '/pages/create',
    Image: ArticlesIcon,
  },
  // {
  //   label: 'Menus',
  //   to: '/menus',
  //   src: 'todo',
  // },
  // {
  //   label: 'Users',
  //   to: '/users',
  //   src: 'todo',
  // },
]
// TODO pull this name from the consuming application. i.e. acme
const heading = 'Acme'

export default function() {
  Auth.currentAuthenticatedUser()
    .then(() => {
      // All good, you're allowed to be here!
    })
    .catch(() => {
      // User not authorised so redirect to View where they can log in
      gotoNewUrl('view', '/login')
    })

  return (
    <AdminDashboard data={sideBarItems} heading={heading} content={content} />
  )
}
