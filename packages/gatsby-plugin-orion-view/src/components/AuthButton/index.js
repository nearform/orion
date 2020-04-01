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
  const sLabelIn = 'sign in'
  const sLabelOut = 'sign out'
  const sSlugIn = '/login'
  const sSlugOut = '/'

  const amLoggedIn = Auth.user !== null

  const classes = useStyles()

  const handleSignout = () => {
    Auth.signOut()
    navigate(sSlugOut)
  }

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        component={Button}
        to={undefined}
        onClick={amLoggedIn ? () => handleSignout() : () => navigate(sSlugIn)}
      >
        {amLoggedIn ? sLabelOut : sLabelIn}
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
