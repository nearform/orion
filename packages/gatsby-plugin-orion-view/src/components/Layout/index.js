import React from 'react'
import T from 'prop-types'
import Footer from 'gatsby-plugin-orion-core/src/components/Footer'
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

const Img = ({ ...props }) => <img {...props} />

function Layout({ children, classes }) {
  return (
    <div className={classes.root}>
      <header>
        <SecondaryAppBar data={[]} onSearch={() => {}} />
      </header>
      <main>
        {children}
      </main>
      <footer>
        <Footer socialIcons={socialIcons} logo={logo} Img={Img} />
      </footer>
    </div>
  )
}

Layout.propTypes = {
  classes: T.object,
}

const styles = theme => ({ ...theme.layout })

export default withStyles(styles, { withTheme: true })(Layout)
