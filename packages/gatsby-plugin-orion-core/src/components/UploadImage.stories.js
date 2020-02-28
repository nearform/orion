import React, { useEffect, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { text } from '@storybook/addon-knobs'
import Amplify, { Auth } from 'aws-amplify'
import UploadImage from './UploadImage'

const AwsStorage = ({ children }) => {
  console.log('Bucket:', process.env.STORYBOOK_AWS_S3_BUCKET) // eslint-disable-line no-console
  useEffect(() => {
    Amplify.configure({
      Auth: {
        identityPoolId: process.env.STORYBOOK_AWS_COGNITO_IDENTITY_POOL_ID,
        region: process.env.STORYBOOK_AWS_REGION,
        userPoolId: process.env.STORYBOOK_AWS_COGNITO_USER_POOL_ID,
        userPoolWebClientId:
          process.env.STORYBOOK_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID,
        cookieStorage: {
          domain: window.location.hostname,
          path: '/',
          expires:
            Number(process.env.STORYBOOK_AWS_COGNITO_COOKIE_EXPIRATION) || 1,
          secure: Boolean(process.env.STORYBOOK_AWS_COGNITO_COOKIE_SECURE),
        },
      },
      Storage: {
        AWSS3: {
          bucket: process.env.STORYBOOK_AWS_S3_BUCKET,
          region: process.env.STORYBOOK_AWS_REGION,
        },
      },
    })
  }, [])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  return (
    <>
      <p>Sign Up</p>
      <form>
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="text"
          value={password}
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type="text"
          value={code}
          placeholder="code"
          onChange={e => setCode(e.target.value)}
        />
        <button
          type="button"
          onClick={async () => {
            const data = await Auth.signUp({
              username,
              password,
            })
            console.log('DATA:', data) // eslint-disable-line no-console
          }}
        >
          SignUp
        </button>
        <button
          type="button"
          onClick={async () => {
            const user = await Auth.signIn(username, password)
            console.log('USER:', user) // eslint-disable-line no-console
          }}
        >
          SignIn
        </button>
        <button
          type="button"
          onClick={async () => {
            const data = await Auth.confirmSignUp(username, code)
            console.log('DATA:', data) // eslint-disable-line no-console
          }}
        >
          Confirm
        </button>
      </form>
      {children}
    </>
  )
}

storiesOf('UploadImage', module)
  .addDecorator(jsxDecorator)
  .add('Interactive', () => {
    return (
      <AwsStorage>
        <UploadImage path={text('Path', 'path/to/storage')} />
      </AwsStorage>
    )
  })
