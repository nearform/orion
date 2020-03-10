import React, { useState, useEffect } from 'react'
import { Redirect } from '@reach/router'

import UserRegistration from '../UserRegistration'
import UserRegistrationConfirm from '../UserRegistrationConfirm'
import UserLogin from '../UserLogin'

const UserAuthentication = () => {
  const [authStage, setAuthStage] = useState('login')
  const [username, setUsername] = useState()
  const [authState, setAuthState] = useState(
    <UserLogin setAuthStage={setAuthStage} />
  )

  useEffect(() => {
    switch (authStage) {
      case 'register':
        setAuthState(
          <UserRegistration
            setAuthStage={setAuthStage}
            setUsername={setUsername}
          />
        )
        break
      case 'confirm':
        setAuthState(
          <UserRegistrationConfirm
            setAuthStage={setAuthStage}
            username={username}
          />
        )
        break
      case 'loggedIn':
        setAuthState(<Redirect nothrow to="/" />)
        break
      default:
        setAuthState(<UserLogin setAuthStage={setAuthStage} />)
    }
  }, [authStage, username])

  return authState
}

export default UserAuthentication
