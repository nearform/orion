import React from 'react'
import Amplify from 'aws-amplify'
import { Authenticator } from 'aws-amplify-react'
import { GraphQLClient, ClientContext } from 'graphql-hooks'

// custom typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import awsConfig from './src/aws-exports'
import DisplayIfSignedIn from './src/components/DisplayIfSignedIn'

const client = new GraphQLClient({
  url: process.env.GATSBY_GRAPHQL_API,
  headers: {
    'x-hasura-admin-secret': process.env.GATSBY_GRAPHQL_ADMIN_SECRET,
  },
})

export function onClientEntry() {
  Amplify.configure(awsConfig)
}

export const wrapRootElement = ({ element }) => {
  return (
    <ClientContext.Provider value={client}>{element}</ClientContext.Provider>
  )
}

export const wrapPageElement = ({ element, ...props }) => {
  return (
    <Authenticator>
      <DisplayIfSignedIn>{element}</DisplayIfSignedIn>
    </Authenticator>
  )
}
