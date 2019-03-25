/*
{
    "request": {
        "userAttributes": {
            "string": "string",
            ....
        }
        "groupConfiguration": {
        "groupsToOverride": ["string", ....],
        "iamRolesToOverride": ["string", ....],
        "preferredRole": "string"
    },
    "response": {
        "claimsOverrideDetails": {
            "claimsToAddOrOverride": {
                "string": "string",
                ....
            },
            "claimsToSuppress": ["string", ....],

            "groupOverrideDetails": {
                "groupsToOverride": ["string", ....],
                "iamRolesToOverride": ["string", ....],
                "preferredRole": "string"
            }
        }
    }
}
*/
/*
{
    "version": number,
    "triggerSource": "string",
    "region": AWSRegion,
    "userPoolId": "string",
    "userName": "string",
    "callerContext": {
        "awsSdkVersion": "string",
        "clientId": "string"
    },
    "request": {
        "userAttributes": {
            "string": "string",
            ....
        }
    },
    "response": {}
}
*/

// PostConfirmation_ConfirmSignUp <<-- triggerSource

const graphql = require('../graphql')

exports.handler = async event => {
  const queryUser = `
        {
          user(
            limit: 1 
            where: {cognito_id: { _eq: "${event.request.userAttributes.sub}"}}
          ) {
            id
            name
            user_roles {
              role {
                name
              }
            }
          }
        }
    `

  const {
    body: {
      data: { user },
    },
  } = await graphql(queryUser)

  event.response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride: {
        'https://hasura.io/jwt/claims': JSON.stringify({
          'x-hasura-allowed-roles': [user[0].user_roles[0].role.name],
          'x-hasura-default-role': user[0].user_roles[0].role.name,
          'x-hasura-user-id': user[0].id,
          'x-hasura-org-id': '123',
          'x-hasura-custom': 'custom-value',
        }),
      },
    },
  }

  return event
}
