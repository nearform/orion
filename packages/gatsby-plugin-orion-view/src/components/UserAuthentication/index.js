import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import Amplify from 'aws-amplify'

import awsConfig from '../../utils/aws-config'
import UserRegistration from '../UserRegistration'
import UserRegistrationConfirm from '../UserRegistrationConfirm'
import UserLogin from '../UserLogin'

const UserAuthentication = () => {
  if (typeof window !== 'undefined') {
    Amplify.configure(awsConfig)
  }

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
        navigate('/')
        break
      default:
        setAuthState(<UserLogin setAuthStage={setAuthStage} />)
    }
  }, [authStage, username])

  return authState
}

export default UserAuthentication
