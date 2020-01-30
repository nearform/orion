import React from 'react'

import { UserProfileView } from 'components'
import Seo from '../components/Seo'

export default function Profile({ pageContext }) {
  const { userSummary } = pageContext
  return <UserProfileView Seo={Seo} userSummary={userSummary} />
}
