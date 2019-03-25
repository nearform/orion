/*
{
    version: '1',
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_QeZSaIzBc',
    userName: 'simone3',
    callerContext: {
        awsSdkVersion: 'aws-sdk-unknown-unknown',
        clientId: '2sdk5rf1kuk8ma9mn5e4mtklqf'
    },
    triggerSource: 'PostConfirmation_ConfirmSignUp',
    request: {
        userAttributes: {
            sub: '331fea42-48f4-4235-bd6f-70c7fdc46f27',
            'cognito:user_status': 'CONFIRMED',
            email_verified: 'true',
            phone_number_verified: 'false',
            phone_number: '+11132123234',
            email: 'simone.busoli+3@gmail.com'
        }
    },
    response: {}
}
*/

const graphql = require('../graphql')

exports.handler = async event => {
  const queryRoles = `{
      role {
          id
          name
      }
  }`

  const {
    body: {
      data: { role },
    },
  } = await graphql(queryRoles)

  const createUser = `
    mutation createUser {
      insert_user(objects: {
          cognito_id: "${event.request.userAttributes.sub}"
          name: "${event.userName}"
          roles: {
              data: [{
                  role_id: ${role[0].id}
              }]
          }
      }) {
          returning {
              id
              cognito_id
          }
      }
  }
  `

  await graphql(createUser)

  return event
}
