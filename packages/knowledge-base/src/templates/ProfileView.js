import React from 'react'

import { Profile } from 'components'
import SEO from '../components/SEO'

export default function ProfilePage() {
  return <Profile path="/profile/*" SEO={SEO} />
}
