import React from 'react'
import { Box, makeStyles } from '@material-ui/core'
import T from 'prop-types'
import { PaddedContainer } from 'components'
import get from 'lodash/get'

const usePageSectionStyles = makeStyles(theme => ({
  wrapper: ({ paletteColor }) => {
    return {
      backgroundColor: paletteColor
        ? get(theme.palette, paletteColor)
        : 'transparent',
      padding: theme.spacing(4, 0),
    }
  },
}))

/*
  Basic page section expands across screen and restricts content children
  Allows background color to be confiugured
*/
const PageSection = ({ children, className, paletteColor }) => {
  const { wrapper } = usePageSectionStyles({ paletteColor })

  return (
    <Box className={wrapper} component="section" data-test-id="page-section">
      <PaddedContainer className={className}>{children}</PaddedContainer>
    </Box>
  )
}

PageSection.propTypes = {
  children: T.any.isRequired,
  paletteColor: T.array, // Array of keys to access a colour from the root of the palette object in theme
  className: T.string,
}

export default PageSection
