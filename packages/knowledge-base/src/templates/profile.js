import React from 'react'

import ProfileView from '../components/ProfileView'

export default function Content({ pageContext }) {
  const { userSummary } = pageContext
  return <ProfileView userSummary={userSummary} />
}
