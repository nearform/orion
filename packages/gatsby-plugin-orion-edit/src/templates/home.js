import React from 'react'
import AdminDashboard from '../components/AdminDashboard'
import ArticlesIcon from '../components/SvgIcons/drawing-woman.inline.svg'
import PagesIcon from '../components/SvgIcons/support-notes.inline.svg'

import { checkIfAuthenticated } from 'gatsby-plugin-orion-core/src/utils/amplify'
import { navigate, useLocation } from '@reach/router'

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
    to: '/article/create/',
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
    label: 'Create page',
    to: '/pages/create',
    Image: PagesIcon,
  },
  {
    label: 'Create Article',
    to: '/article/create',
    Image: ArticlesIcon,
  },
]
// TODO pull this name from the consuming application. i.e. acme
const heading = 'Acme'

export default function() {
  const location = useLocation()
  checkIfAuthenticated(location.hostname)

  return (
    <AdminDashboard data={sideBarItems} heading={heading} content={content} />
  )
}
