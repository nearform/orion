import React from 'react'
import { Link as RouterLink } from '@reach/router'
import { SiteHeader } from 'components'

import { isAdmin } from '../utils/auth'

function MainToolbar() {
  return (
    <SiteHeader linkComponent={RouterLink} isAdmin={isAdmin} />
  )
}

export default MainToolbar
