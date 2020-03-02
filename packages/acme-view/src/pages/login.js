import React from 'react'
import Layout from '../components/Layout'
import UserLogin from 'gatsby-plugin-orion-view/src/components/UserLogin'

const Login = () => <Layout page={{ ancestry: [] }}>{UserLogin}</Layout>

export default Login
