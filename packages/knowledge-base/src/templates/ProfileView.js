import React from 'react'

import { Profile } from 'components'
import SEO from '../components/SEO'
import { constructImageUrl } from '../utils/image'

export default function ProfilePage() {
  return (
    <Profile
      path="/profile/*"
      SEO={SEO}
      constructImageUrl={constructImageUrl}
    />
  )
}
