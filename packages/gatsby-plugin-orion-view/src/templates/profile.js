import React from 'react'

import { UserProfileView } from 'components'
import SEO from '../components/SEO'

export default function Profile({ pageContext }) {
  const { userSummary } = pageContext
  return <UserProfileView SEO={SEO} userSummary={userSummary} />
}
