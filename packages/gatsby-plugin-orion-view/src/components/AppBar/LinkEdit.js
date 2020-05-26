import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { navigate } from '@reach/router'
import { Auth } from 'gatsby-plugin-orion-core/src/utils/amplify'

const LinkEdit = ({ userRole }) => {
  if ((userRole === 'User' || userRole === 'Admin') && Auth.user !== null) {
    let slug = process.env.GATSBY_URL_EDIT || ''

    if (slug === '') {
      const hostnameSections = window.location.hostname.toLowerCase().split('.')

      switch (hostnameSections[0]) {
        case 'view':
          slug = `edit.${hostnameSections[1]}.${hostnameSections[2]}`
          break
        case 'localhost':
          slug = 'http://localhost:8001'
          break
        default:
          console.error('edit redirect not configured in Environment vars')
      }
    }

    return <Button onClick={() => navigate(slug)}>Edit</Button>
  }

  return null
}

LinkEdit.propTypes = {
  userRole: PropTypes.string,
}

LinkEdit.defaultProps = {
  userRole: undefined,
}

export default LinkEdit
