import React from 'react'
import { SiteHeader } from 'components'

import { isAdmin } from '../utils/auth'
import NavLink from './NavLink'

function MainToolbar() {
  return <SiteHeader linkComponent={NavLink} isAdmin={isAdmin} />
}

export default MainToolbar
