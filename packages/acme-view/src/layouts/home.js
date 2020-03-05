import React from 'react'
import T from 'prop-types'

function HomeLayout({ main }) {
  return <div>{main}</div>
}

HomeLayout.propTypes = {
  main: T.node.isRequired,
}

export default HomeLayout
