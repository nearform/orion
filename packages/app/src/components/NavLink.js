import React from 'react'
import { Link } from '@reach/router'

export default ({ partial = true, ...props }) => (
  <Link
    {...props}
    getProps={({ isCurrent, isPartiallyCurrent }) => {
      const isActive = partial ? isPartiallyCurrent : isCurrent
      return {
        style: {
          color: isActive ? 'red' : 'blue',
        },
      }
    }}
  />
)
