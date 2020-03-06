import React from 'react'
import T from 'prop-types'
import PaddedContainer from 'gatsby-plugin-orion-core/src/components/PaddedContainer'

function SectionLayout({ main }) {
  return <PaddedContainer>{main}</PaddedContainer>
}

SectionLayout.propTypes = {
  main: T.node.isRequired,
}

export default SectionLayout
