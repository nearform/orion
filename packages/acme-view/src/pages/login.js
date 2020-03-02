import React from 'react'
import Layout from '../components/Layout'
import UserLogin from 'gatsby-plugin-orion-view/src/components/UserLogin'
import { withStyles } from '@material-ui/core'

const Login = () => (
  <Layout page={{ ancestry: [] }}>
    <UserLogin />
  </Layout>
)

const styles = theme => ({ ...theme.layout })

export default withStyles(styles, { withTheme: true })(Login)
