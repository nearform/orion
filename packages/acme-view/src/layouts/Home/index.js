import React from 'react'
import Layout from '../../components/Layout'
import HomePageHero from '../../components/HomePageHero'
import homepageImage from '../../../assets/orion-hero-2x.png'

function HomeLayout({ main, page }) {
  return (
    <Layout page={page}>
      <HomePageHero imageSrc={homepageImage} />
      <h1>Home</h1>
      <div>{main}</div>
    </Layout>
  )
}

export default HomeLayout
