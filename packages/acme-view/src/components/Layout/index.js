import React, { useMemo } from 'react'
import T from 'prop-types'
import Footer from 'gatsby-plugin-orion-core/src/components/Footer'
import AcmeAppBar from '../AcmeAppBar'
import SearchInput from 'gatsby-plugin-orion-core/src/components/SearchInput'
import SecondaryAppBar from 'gatsby-plugin-orion-view/src/components/SecondaryAppBar'
import { useLocation } from '@reach/router'
import { makeStyles } from '@material-ui/core'
import { socialIcons } from './utils/constants'
import Logo from 'gatsby-plugin-orion-core/src/assets/logo.inline.svg'

const useStyles = makeStyles(theme => ({
  '@global': {
    'html, body, body > div:first-child, body > div:first-child > div:first-child, body > div:first-child > div:first-child > div:first-child': {
      height: '100%',
    },
    body: {
      overflowY: 'scroll',
      fontFamily: theme.fontFamily,
    },
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '& main': {
      flex: 1,
    },
    '& footer > div': {
      overflow: 'hidden',
    },
  },
}))

function Layout({ children, menu, page }) {
  const classes = useStyles()
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
        <AcmeAppBar
          brandTo="/"
          Logo={Logo}
          childIndicatorIcon="fas fa-caret-right"
          dropDownIndicatorIcon="fas fa-caret-down"
          userRole="User"
          menuData={menu}
          location={location.pathname}
        />
        {(!page || page.layout !== 'home') && (
          <SecondaryAppBar action={<SearchInput />} data={parents} />
        )}
      </header>
      <main>{children}</main>
      <footer>
        <Footer socialIcons={socialIcons} Logo={Logo} />
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: T.node.isRequired,
  page: T.object,
  menu: T.array,
}

Layout.defaultProps = {
  page: undefined,
  menu: undefined,
}

export default Layout
