jest.mock('../graphql')

const handler = require('./').handler
const graphql = require('../graphql')
const { queryUserByCognitoId } = require('./queries')

const originalEvent = {
  version: '1',
  triggerSource: 'TokenGeneration_Authentication',
  region: 'eu-west-1',
  userPoolId: 'eu-west-1_QeZSaIzBc',
  userName: 'simone3',
  callerContext: {
    awsSdkVersion: 'aws-sdk-unknown-unknown',
    clientId: '2sdk5rf1kuk8ma9mn5e4mtklqf',
  },
  request: {
    userAttributes: {
      sub: '9d712c67-d424-433d-82fb-a0d950f4ebbd',
      email_verified: 'true',
      'cognito:user_status': 'CONFIRMED',
      phone_number_verified: 'false',
      phone_number: '+13424234',
      email: 'simone.busoli+3@gmail.com',
    },
    groupConfiguration: {
      groupsToOverride: [],
      iamRolesToOverride: [],
      preferredRole: null,
    },
  },
  response: { claimsOverrideDetails: null },
}

const noUsersFromDb = Promise.resolve({
  user: [],
})

const oneUserFromDb = Promise.resolve({
  user: [
    {
      id: 'some id',
      user_roles: [
        {
          role: {
            name: 'some role',
          },
        },
      ],
    },
  ],
})

describe('jwt-enrichment-hook', () => {
  it('should issue a graphql query to load user details', async () => {
    graphql.mockReturnValue(noUsersFromDb)

    await handler(originalEvent)

    expect(graphql).toBeCalledWith(queryUserByCognitoId, {
      cognitoId: originalEvent.request.userAttributes.sub,
    })
  })

  describe('when no users found', () => {
    it("should return the same response as the original event's response", async () => {
      graphql.mockReturnValue(noUsersFromDb)

      const event = await handler(originalEvent)

      expect(event.response).toBe(originalEvent.response)
    })
  })

  describe('when a user is found', () => {
    let event

    beforeEach(async () => {
      graphql.mockReturnValue(oneUserFromDb)

      event = await handler(originalEvent)
    })

    it('should enrich the response with a custom claim', () => {
      expect(
        event.response.claimsOverrideDetails.claimsToAddOrOverride
      ).toBeDefined()
    })

    it('should encode the custom claim as a JSON string', () => {
      const customClaim =
        event.response.claimsOverrideDetails.claimsToAddOrOverride[
          'https://hasura.io/jwt/claims'
        ]

      expect(JSON.parse(customClaim)).toBeDefined()
    })

    it('should put the user role among allowed roles', async () => {
      const allowedRoles = JSON.parse(
        event.response.claimsOverrideDetails.claimsToAddOrOverride[
          'https://hasura.io/jwt/claims'
        ]
      )['x-hasura-allowed-roles']

      const graphqlResponse = await oneUserFromDb

      expect(allowedRoles).toEqual([
        graphqlResponse.user[0].user_roles[0].role.name,
      ])
    })

    it('should use the user role as the default role', async () => {
      const defaultRole = JSON.parse(
        event.response.claimsOverrideDetails.claimsToAddOrOverride[
          'https://hasura.io/jwt/claims'
        ]
      )['x-hasura-default-role']

      const graphqlResponse = await oneUserFromDb

      expect(defaultRole).toEqual(
        graphqlResponse.user[0].user_roles[0].role.name
      )
    })

    it('should use the user id as the claim user id', async () => {
      const userId = JSON.parse(
        event.response.claimsOverrideDetails.claimsToAddOrOverride[
          'https://hasura.io/jwt/claims'
        ]
      )['x-hasura-user-id']

      const graphqlResponse = await oneUserFromDb

      expect(userId).toEqual(graphqlResponse.user[0].id)
    })

    it('should not contain any other claims', () => {
      const claimsKeys = Object.keys(
        JSON.parse(
          event.response.claimsOverrideDetails.claimsToAddOrOverride[
            'https://hasura.io/jwt/claims'
          ]
        )
      )

      expect(claimsKeys).toEqual([
        'x-hasura-allowed-roles',
        'x-hasura-default-role',
        'x-hasura-user-id',
      ])
    })
  })
})
