import React from 'react'
import { Box, makeStyles, useMediaQuery } from '@material-ui/core'
import T from 'prop-types'

import banner from 'efqm-theme/assets/HeroImage.jpg'
import wideBanner from 'efqm-theme/assets/HeroImage@2x.jpg'

const useHeroImageWrapperStyles = makeStyles(() => ({
  wrapper: {
    backgroundPosition: 'top left',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
  },
  narrowHero: {
    backgroundImage: `url('${banner}')`,
  },
  wideHero: {
    backgroundImage: `url('${wideBanner}')`,
  },
}))

const HeroImageWrapper = ({ children }) => {
  let responsiveHeroImageClass = 'narrowHero'
  if (useMediaQuery('(min-width:1024px)')) {
    responsiveHeroImageClass = 'wideHero'
  }

  const classes = useHeroImageWrapperStyles()

  return (
    <Box
      className={[classes.wrapper, classes[responsiveHeroImageClass]].join(' ')}
      data-test-id="hero-image-wrapper"
    >
      {children}
    </Box>
  )
}

HeroImageWrapper.propTypes = {
  children: T.any,
}

export default HeroImageWrapper
