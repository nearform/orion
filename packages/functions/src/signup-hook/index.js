import graphql from '../graphql'
import createUser from './graphql/create-user.graphql'

export const handler = async event => {
  console.log('creating user', event)
  if (event.triggerSource === 'PostConfirmation_ConfirmSignUp') {
    const user = await graphql(createUser, {
      cognitoId: event.request.userAttributes.sub,
      email: event.request.userAttributes.email,
      firstName: event.request.userAttributes.firstname,
      lastName: event.request.userAttributes.lastname,
      signupRequest: event.request,
    })
    console.log('created user', JSON.stringify(user))
  }

  return event
}
