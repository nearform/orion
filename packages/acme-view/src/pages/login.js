import React from 'react'
import Layout from '../components/Layout'
import UserAuthentication from 'gatsby-plugin-orion-view/src/components/UserAuthentication'
import { withStyles } from '@material-ui/core'

const Login = () => (
  <Layout page={{ ancestry: [] }}>
    <UserAuthentication />
  </Layout>
)

const styles = theme => ({ ...theme.layout })

export default withStyles(styles, { withTheme: true })(Login)
