import React from 'react'
import T from 'prop-types'

function SectionLayout({ main }) {
  return <div>{main}</div>
}

SectionLayout.propTypes = {
  main: T.node.isRequired,
}

export default SectionLayout
