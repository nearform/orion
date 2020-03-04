import React from 'react'
import Layout from '../../components/Layout'
import { Grid } from '@material-ui/core'
import heroImage from '../../../assets/orion-hero-2x.png'

console.log('IMG:', heroImage)

function HomeLayout({ main, page }) {
  return (
    <Layout page={page}>
      <Grid item>
        <img src={heroImage} />
      </Grid>
      <h1>Home</h1>
      <div>{main}</div>
    </Layout>
  )
}

export default HomeLayout
