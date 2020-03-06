import React, { useState, useEffect } from 'react'

import UserRegistration from '../UserRegistration'
import UserRegistrationConfirm from '../UserRegistrationConfirm'
import UserLogin from '../UserLogin'

const UserAuthentication = () => {
  const [authState, setAuthState] = useState(
    <UserLogin setAuthStage={setAuthStage} />
  )
  const [authStage, setAuthStage] = useState('login')
  const [username, setUsername] = useState()

  useEffect(() => {
    if (authStage === 'register') {
      setAuthState(
        <UserRegistration
          setAuthStage={setAuthStage}
          setUsername={setUsername}
        />
      )
    } else if (authStage === 'confirm') {
      setAuthState(
        <UserRegistrationConfirm
          setAuthStage={setAuthStage}
          username={username}
        />
      )
    } else {
      setAuthState(<UserLogin setAuthStage={setAuthStage} />)
    }
  }, [authStage, username])

  return authState
}

export default UserAuthentication
