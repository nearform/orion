// gatsby-background-image causes some issues with missnamed css values
import React from 'react'
function mockBackGroundImage({ children }) {
  return <div>{children}</div>
}
export default mockBackGroundImage
