import React from 'react'
import Layout from '../components/Layout'
import UserRegistration from 'gatsby-plugin-orion-view/src/components/UserRegistration'

const Registration = () => (
  <Layout page={{ ancestry: [] }}>{UserRegistration}</Layout>
)

export default Registration
