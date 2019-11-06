import React from 'react'

import { Profile } from 'components'
import SEO from '../components/SEO'
import { constructImageUrl } from '../utils/image'

const ProfileView = () => (
  <Profile SEO={SEO} constructImageUrl={constructImageUrl} />
)

export default ProfileView
