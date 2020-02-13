import graphql from '../graphql'
import getUserByCognitoId from './graphql/get-user-by-cognito-id.graphql'
import { handler } from '.'

jest.mock('../graphql')

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
      email_verified: 'true', // eslint-disable-line camelcase
      'cognito:user_status': 'CONFIRMED',
      phone_number_verified: 'false', // eslint-disable-line camelcase
      phone_number: '+13424234', // eslint-disable-line camelcase
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
    },
  ],
})

const oneUserWithGroupFromDb = groupType =>
  Promise.resolve({
    user: [
      {
        id: 'some id',
        // eslint-disable-next-line camelcase
        user_groups: [
          {
            group: {
              id: 1,
              name: 'some group',
              type: groupType,
            },
          },
        ],
      },
    ],
  })

const oneUserWithGroupAndRoleFromDb = (groupType, roleName) =>
  Promise.resolve({
    user: [
      {
        id: 'some id',
        // eslint-disable-next-line camelcase
        user_groups: [
          {
            group: {
              id: 1,
              name: 'some group',
              type: groupType,
            },
          },
        ],
        // eslint-disable-next-line camelcase
        user_roles: [
          {
            role: {
              id: 1,
              name: roleName,
              order: 1,
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

    expect(graphql).toBeCalledWith(getUserByCognitoId, {
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

    it('should use the user id as the claim user id', async () => {
      const userId = JSON.parse(
        event.response.claimsOverrideDetails.claimsToAddOrOverride[
          'https://hasura.io/jwt/claims'
        ]
      )['x-hasura-user-id']

      const graphqlResponse = await oneUserFromDb

      expect(userId).toEqual(graphqlResponse.user[0].id)
    })

    describe('user with group', () => {
      ;['platform', 'partner', 'company'].forEach(groupType => {
        describe(`when the user belongs to a group of type ${groupType}`, () => {
          let event
          let query

          beforeEach(async () => {
            query = oneUserWithGroupFromDb(groupType)
            graphql.mockReturnValue(query)

            event = await handler(originalEvent)
          })

          it('it should have allowed role "user" in claims', async () => {
            const allowedRoles = JSON.parse(
              event.response.claimsOverrideDetails.claimsToAddOrOverride[
                'https://hasura.io/jwt/claims'
              ]
            )['x-hasura-allowed-roles']

            await query

            expect(allowedRoles).toEqual(['user'])
          })

          it('it should have default role "user" in claims', async () => {
            const defaultRole = JSON.parse(
              event.response.claimsOverrideDetails.claimsToAddOrOverride[
                'https://hasura.io/jwt/claims'
              ]
            )['x-hasura-default-role']

            await query

            expect(defaultRole).toEqual('user')
          })

          it('it should have group id in claims', async () => {
            const groupId = JSON.parse(
              event.response.claimsOverrideDetails.claimsToAddOrOverride[
                'https://hasura.io/jwt/claims'
              ]
            )['x-hasura-group-id']

            const graphqlResponse = await query

            expect(groupId).toEqual(
              graphqlResponse.user[0].user_groups[0].group.id.toString()
            )
          })
        })

        describe(`when the user belongs to a group of type ${groupType} with a role "admin"`, () => {
          let event
          let query

          beforeEach(async () => {
            query = oneUserWithGroupAndRoleFromDb(groupType, 'admin')
            graphql.mockReturnValue(query)

            event = await handler(originalEvent)
          })

          it(`it should have allowed role "${groupType}-admin" in claims`, async () => {
            const allowedRoles = JSON.parse(
              event.response.claimsOverrideDetails.claimsToAddOrOverride[
                'https://hasura.io/jwt/claims'
              ]
            )['x-hasura-allowed-roles']

            await query

            expect(allowedRoles).toEqual([`${groupType}-admin`])
          })

          it(`it should have default role "${groupType}-admin" in claims`, async () => {
            const defaultRole = JSON.parse(
              event.response.claimsOverrideDetails.claimsToAddOrOverride[
                'https://hasura.io/jwt/claims'
              ]
            )['x-hasura-default-role']

            await query

            expect(defaultRole).toEqual(`${groupType}-admin`)
          })

          it('it should have group id in claims', async () => {
            const groupId = JSON.parse(
              event.response.claimsOverrideDetails.claimsToAddOrOverride[
                'https://hasura.io/jwt/claims'
              ]
            )['x-hasura-group-id']

            const graphqlResponse = await query

            expect(groupId).toEqual(
              graphqlResponse.user[0].user_groups[0].group.id.toString()
            )
          })
        })

        describe(`when the user belongs to a group of type ${groupType} with a role "member"`, () => {
          let event
          let query

          beforeEach(async () => {
            query = oneUserWithGroupAndRoleFromDb(groupType, 'member')
            graphql.mockReturnValue(query)

            event = await handler(originalEvent)
          })

          it('it should have allowed role "user" in claims', async () => {
            const allowedRoles = JSON.parse(
              event.response.claimsOverrideDetails.claimsToAddOrOverride[
                'https://hasura.io/jwt/claims'
              ]
            )['x-hasura-allowed-roles']

            await query

            expect(allowedRoles).toEqual(['user'])
          })

          it('it should have default role "user" in claims', async () => {
            const defaultRole = JSON.parse(
              event.response.claimsOverrideDetails.claimsToAddOrOverride[
                'https://hasura.io/jwt/claims'
              ]
            )['x-hasura-default-role']

            await query

            expect(defaultRole).toEqual('user')
          })

          it('it should have group id in claims', async () => {
            const groupId = JSON.parse(
              event.response.claimsOverrideDetails.claimsToAddOrOverride[
                'https://hasura.io/jwt/claims'
              ]
            )['x-hasura-group-id']

            const graphqlResponse = await query

            expect(groupId).toEqual(
              graphqlResponse.user[0].user_groups[0].group.id.toString()
            )
          })
        })

        describe(`when the user belongs to a group of type ${groupType} with a role "member"`, () => {
          let event
          let query

          beforeEach(async () => {
            query = oneUserWithGroupAndRoleFromDb(groupType, 'member')
            graphql.mockReturnValue(query)

            event = await handler(originalEvent)
          })

          it('it should have allowed role "public" in claims', async () => {
            const allowedRoles = JSON.parse(
              event.response.claimsOverrideDetails.claimsToAddOrOverride[
                'https://hasura.io/jwt/claims'
              ]
            )['x-hasura-allowed-roles']

            await query

            expect(allowedRoles).toEqual(['user'])
          })

          it('it should have default role "user" in claims', async () => {
            const defaultRole = JSON.parse(
              event.response.claimsOverrideDetails.claimsToAddOrOverride[
                'https://hasura.io/jwt/claims'
              ]
            )['x-hasura-default-role']

            await query

            expect(defaultRole).toEqual('user')
          })

          it('it should have group id in claims', async () => {
            const groupId = JSON.parse(
              event.response.claimsOverrideDetails.claimsToAddOrOverride[
                'https://hasura.io/jwt/claims'
              ]
            )['x-hasura-group-id']

            const graphqlResponse = await query

            expect(groupId).toEqual(
              graphqlResponse.user[0].user_groups[0].group.id.toString()
            )
          })
        })

        describe('when the user belongs to a group without type with a role', () => {
          let event
          let query

          beforeEach(async () => {
            query = oneUserWithGroupAndRoleFromDb(null, 'admin')
            graphql.mockReturnValue(query)

            event = await handler(originalEvent)
          })

          it('it should have allowed role "admin" in claims', async () => {
            const allowedRoles = JSON.parse(
              event.response.claimsOverrideDetails.claimsToAddOrOverride[
                'https://hasura.io/jwt/claims'
              ]
            )['x-hasura-allowed-roles']

            await query

            expect(allowedRoles).toEqual(['admin'])
          })

          it('it should have default role "admin" in claims', async () => {
            const defaultRole = JSON.parse(
              event.response.claimsOverrideDetails.claimsToAddOrOverride[
                'https://hasura.io/jwt/claims'
              ]
            )['x-hasura-default-role']

            await query

            expect(defaultRole).toEqual('admin')
          })

          it('it should have group id in claims', async () => {
            const groupId = JSON.parse(
              event.response.claimsOverrideDetails.claimsToAddOrOverride[
                'https://hasura.io/jwt/claims'
              ]
            )['x-hasura-group-id']

            const graphqlResponse = await query

            expect(groupId).toEqual(
              graphqlResponse.user[0].user_groups[0].group.id.toString()
            )
          })
        })

        describe('when the user belongs to a group without type without a role', () => {
          let event
          let query

          beforeEach(async () => {
            query = oneUserWithGroupFromDb(null)
            graphql.mockReturnValue(query)

            event = await handler(originalEvent)
          })

          it('it should have allowed role "user" in claims', async () => {
            const allowedRoles = JSON.parse(
              event.response.claimsOverrideDetails.claimsToAddOrOverride[
                'https://hasura.io/jwt/claims'
              ]
            )['x-hasura-allowed-roles']

            await query

            expect(allowedRoles).toEqual(['user'])
          })

          it('it should have default role "user" in claims', async () => {
            const defaultRole = JSON.parse(
              event.response.claimsOverrideDetails.claimsToAddOrOverride[
                'https://hasura.io/jwt/claims'
              ]
            )['x-hasura-default-role']

            await query

            expect(defaultRole).toEqual('user')
          })

          it('it should have group id in claims', async () => {
            const groupId = JSON.parse(
              event.response.claimsOverrideDetails.claimsToAddOrOverride[
                'https://hasura.io/jwt/claims'
              ]
            )['x-hasura-group-id']

            const graphqlResponse = await query

            expect(groupId).toEqual(
              graphqlResponse.user[0].user_groups[0].group.id.toString()
            )
          })
        })
      })
    })

    describe('user without group', () => {
      let event
      let query

      beforeEach(async () => {
        query = oneUserFromDb
        graphql.mockReturnValue(query)

        event = await handler(originalEvent)
      })

      it('it should have allowed role "public" in claims', async () => {
        const allowedRoles = JSON.parse(
          event.response.claimsOverrideDetails.claimsToAddOrOverride[
            'https://hasura.io/jwt/claims'
          ]
        )['x-hasura-allowed-roles']

        await query

        expect(allowedRoles).toEqual(['public'])
      })

      it('it should have default role "public" in claims', async () => {
        const defaultRole = JSON.parse(
          event.response.claimsOverrideDetails.claimsToAddOrOverride[
            'https://hasura.io/jwt/claims'
          ]
        )['x-hasura-default-role']

        await query

        expect(defaultRole).toEqual('public')
      })
    })
  })
})
