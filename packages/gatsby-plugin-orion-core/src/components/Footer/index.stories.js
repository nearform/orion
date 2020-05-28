import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

import Footer from '.'
import facebook from '../../assets/social/logo-fb.svg'
import youtube from '../../assets/social/logo-youtube.svg'
import twitter from '../../assets/social/logo-twitter.svg'
import linkedin from '../../assets/social/logo-linkedin.svg'
import logo from '../../assets/logo.svg'

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

storiesOf('Core/Interactive/Footer', module)
  .addDecorator(jsxDecorator)
  .add('Link', () => <Footer socialIcons={socialIcons} logo={logo} Img={Img} />)
