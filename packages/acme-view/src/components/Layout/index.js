import React, { useMemo } from 'react'
import T from 'prop-types'
import Footer from 'gatsby-plugin-orion-core/src/components/Footer'
import AppBar from 'gatsby-plugin-orion-view/src/components/AppBar'
import SearchInput from 'gatsby-plugin-orion-core/src/components/SearchInput'
import SecondaryAppBar from 'gatsby-plugin-orion-core/src/components/SecondaryAppBar'
import { withStyles } from '@material-ui/core'
import { useLocation } from '@reach/router'

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

function Layout({ children, classes, menu, page }) {
  const location = useLocation()

  const parents = useMemo(() => {
    if (!page) {
      return []
    }

    return page.ancestry.map(({ ancestor }) => ({
      title: ancestor.title,
      to: ancestor.path,
    }))
  }, [page])

  return (
    <div className={classes.root}>
      <header>
        <AppBar
          brandTo="/"
          logo={logo}
          childIndicatorIcon="fas fa-chevron-right"
          dropDownIndicatorIcon="fas fa-chevron-down"
          userRole="User"
          menuData={menu}
        />
        {location.pathname !== '/' && (
          <SecondaryAppBar
            action={<SearchInput onSearch={() => {}} />}
            data={parents}
          />
        )}
      </header>
      <main>{children}</main>
      <footer>
        <Footer socialIcons={socialIcons} logo={logo} Img={Img} />
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: T.node.isRequired,
  classes: T.object,
  page: T.object,
  menu: T.array.isRequired,
}

Layout.defaultProps = {
  classes: undefined,
}

const styles = theme => ({ ...theme.layout })

export default withStyles(styles, { withTheme: true })(Layout)
