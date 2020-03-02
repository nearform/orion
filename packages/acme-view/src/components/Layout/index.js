import React from 'react'
import T from 'prop-types'
import Footer from 'gatsby-plugin-orion-core/src/components/Footer'
import PaddedContainer from 'gatsby-plugin-orion-core/src/components/PaddedContainer'
import AppBar from 'gatsby-plugin-orion-view/src/components/AppBar'
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

const sampleMenuData = [
  {
    label: 'About',
    children: [
      { label: 'About Acme', to: '/about/acme' },
      { label: 'Our History', to: '/about/history' },
      {
        label: 'Our Team',
        to: '/about/our-team',
        children: [
          { label: 'Our Board', to: '/about/team/our-board' },
          { label: 'Management', to: '/about/team/management' },
          { label: 'Careers', to: '/about/team/careers' },
          { label: 'Graduates', to: '/about/team/graduates' },
        ],
      },
      { label: 'Our Policies', to: '/about/policies' },
    ],
  },
  {
    label: 'Articles',
    leftIconClass: 'fas fa-book',
    children: [
      {
        label: 'Manage',
        to: '/admin/manage-articles',
        leftIconClass: 'fas fa-cogs',
        authRole: 'Admin',
      },
      {
        label: 'Article 1',
        to: '/articles/aritcle-1',
        leftIconClass: 'fas fa-file-alt',
      },
      {
        label: 'Article 2',
        to: '/articles/aritcle-1',
        leftIconClass: 'fas fa-file-alt',
      },
      {
        label: 'Terms and Conditions',
        to: '/articles/terms-and-conditions',
        leftIconClass: 'fas fa-book',
        children: [
          {
            label: 'Ask a Question',
            to: '/contact',
            children: [
              { label: 'Lawyers', to: '/contact/lawyers' },
              { label: 'HR', to: '/contact/hr' },
            ],
          },
          {
            label: 'Legal Stuff',
            to: '/articles/terms-and-conditions/legal-stuff',
            leftIconClass: 'fas fa-file-alt',
          },
          {
            label: 'Legal Stuff (more)',
            to: '/articles/terms-and-conditions/legal-stuff-more',
            leftIconClass: 'fas fa-file-alt',
          },
        ],
      },
    ],
  },
  {
    label: 'Admin',
    leftIconClass: 'fas fa-user-shield',
    authRole: 'Admin',
    children: [
      {
        label: 'Manage Users',
        to: '/admin/users',
        rightIconClass: 'fas fa-users',
      },
      {
        label: 'Manage Content',
        to: 'admin/content',
        rightIconClass: 'fas fa-sliders-h',
      },
    ],
  },
  {
    label: 'Your Account',
    to: '/account',
  },
]

const Img = ({ ...props }) => <img alt="social" {...props} />

function Layout({ children, page }) {
  const parents = page.ancestry.map(({ ancestor }) => ({
    title: ancestor.title,
    to: ancestor.path,
  }))

  return (
    <div>
      <header>
        <AppBar
          brandTo="/home"
          childIndicatorIcon="fas fa-chevron-right"
          dropDownIndicatorIcon="fas fa-chevron-down"
          userRole="User"
          menuData={sampleMenuData}
        />
        <SecondaryAppBar data={parents} onSearch={() => {}} />
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
  page: T.object.isRequired,
}

const styles = theme => ({ ...theme.layout })

export default withStyles(styles, { withTheme: true })(Layout)
