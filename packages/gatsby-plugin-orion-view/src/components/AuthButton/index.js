import React from 'react'
import { Auth } from 'gatsby-plugin-orion-core/src/utils/amplify'

import { navigate } from '@reach/router'
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.common.white,
    marginLeft: '0.5rem',
  },
}))

function AuthButton() {
  const labelIn = 'sign in'
  const labelOut = 'sign out'
  const slugIn = '/login'
  const slugOut = '/'

  const amLoggedIn = Auth.user !== null

  const classes = useStyles()

  const handleSignout = () => {
    Auth.signOut()
    navigate(slugOut)
  }

  return (
    <div>
      <Button
        onClick={amLoggedIn ? () => handleSignout() : () => navigate(slugIn)}
      >
        {amLoggedIn ? labelOut : labelIn}
        <i
          className={`${classes.icon} fas fa-long-arrow-alt-${
            amLoggedIn ? 'right' : 'left'
          }`}
        />
      </Button>
    </div>
  )
}

export default AuthButton
