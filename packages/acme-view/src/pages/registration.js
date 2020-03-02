import React from 'react'
import Layout from '../components/Layout'
import UserRegistration from 'gatsby-plugin-orion-view/src/components/UserRegistration'
import { withStyles } from '@material-ui/core'

const Registration = () => (
  <Layout page={{ ancestry: [] }}>
    <UserRegistration />
  </Layout>
)

const styles = theme => ({ ...theme.layout })

export default withStyles(styles, { withTheme: true })(Registration)
