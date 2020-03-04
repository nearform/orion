import React from 'react'
import T from 'prop-types'
import Footer from 'gatsby-plugin-orion-core/src/components/Footer'
import PaddedContainer from 'gatsby-plugin-orion-core/src/components/PaddedContainer'
import SearchInput from 'gatsby-plugin-orion-core/src/components/SearchInput'
import SecondaryAppBar from 'gatsby-plugin-orion-core/src/components/SecondaryAppBar'
import { withStyles } from '@material-ui/core'

import facebook from 'gatsby-plugin-orion-core/src/assets/social/logo-fb.svg'
import youtube from 'gatsby-plugin-orion-core/src/assets/social/logo-youtube.svg'
import twitter from 'gatsby-plugin-orion-core/src/assets/social/logo-twitter.svg'
import linkedin from 'gatsby-plugin-orion-core/src/assets/social/logo-linkedin.svg'
import logo from 'gatsby-plugin-orion-core/src/assets/logo.svg'

const socialIcons = [
  {
    logo: linkedin,
    url: 'https://www.linkedin.com/company/nearform',
  },
  {
    logo: twitter,
    url: 'https://twitter.com/NearForm',
  },
  {
    logo: youtube,
    url: 'https://www.youtube.com/channel/UCp2Tsbjd3P8itnBHUNHi82A',
  },
  {
    logo: facebook,
    url: 'https://www.facebook.com/NearFormLtd/',
  },
]

const Img = ({ ...props }) => <img alt="social" {...props} />

function Layout({ children, classes, page }) {
  const parents = page.ancestry.map(({ ancestor }) => ({
    title: ancestor.title,
    to: ancestor.path
  }))
  
  return (
    <div className={classes.root}>
      <header>
        <SecondaryAppBar
          action={<SearchInput onSearch={() => {}} />}
          data={parents}
        />
      </header>
      <main>
        <PaddedContainer>{children}</PaddedContainer>
      </main>
      <footer>
        <Footer socialIcons={socialIcons} logo={logo} Img={Img} />
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: T.node.isRequired,
  classes: T.object,
  page: T.object.isRequired,
}

const styles = theme => ({ ...theme.layout })

export default withStyles(styles, { withTheme: true })(Layout)
