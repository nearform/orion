import React from 'react'
import { PaddedContainer } from 'components'

import SEO from './SEO'

import { useUserRoles } from '../utils/auth'

function MyContentRoute() {
  const data = useUserRoles()
  return (
    <PaddedContainer>
      <SEO title="My Content" />
      {JSON.stringify(data)}
      {/* <AdminToolbar pageTitle={pageTitle} /> */}
    </PaddedContainer>
  )
}

export default MyContentRoute
