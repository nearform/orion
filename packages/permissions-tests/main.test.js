const {
  getDeleteMutations,
  deleteAllData,
  createApplicationRoles,
  createClient,
  createGroup,
  createGroupWithDefaultType,
  createUser,
  getUser,
  addUserToGroup,
  getRoleByName,
  assignRoleToUser,
  listGroups,
  listUsers,
  HASURA_ROLES,
  APPLICATION_ROLES,
  CLAIMS,
} = require('./utils')

let deleteMutations

beforeAll(async () => {
  deleteMutations = await getDeleteMutations()
  const result = await deleteAllData(deleteMutations)

  console.log(result)
})

beforeAll(async () => {
  await createApplicationRoles()
})

describe('initial state of the app', () => {
  let platformGroup
  let platformAdmin
  let platformUser
  let partnerGroup
  let partnerAdmin
  let partnerUser
  let companyGroup
  let companyAdmin
  let companyUser
  let partnerCompanyGroup
  let partnerCompanyAdmin
  let partnerCompanyUser

  describe('user and group management', () => {
    describe('super admin', () => {
      test('a super admin should be able to create a platform group', async () => {
        const client = createClient(HASURA_ROLES.admin)

        platformGroup = await createGroup(client, { name: 'platform group' })

        expect(platformGroup.name).toBe('platform group')
        expect(platformGroup.parent_id).toBe(null)
      })

      test('a super admin should be able to create a platform admin user', async () => {
        const client = createClient(HASURA_ROLES.admin)

        platformAdmin = await createUser(client, {
          email: 'platform_admin@email.com',
        })

        expect(platformAdmin.email).toBe('platform_admin@email.com')
      })

      test('a super admin should be able to create a platform normal user', async () => {
        const client = createClient(HASURA_ROLES.admin)

        platformUser = await createUser(client, {
          email: 'platform_user@email.com',
        })

        expect(platformUser.email).toBe('platform_user@email.com')
      })

      test('a super admin should be able to add a platform admin user to the platform group', async () => {
        const client = createClient(HASURA_ROLES.admin)

        await addUserToGroup(client, {
          userId: platformAdmin.id,
          groupId: platformGroup.id,
        })

        const user = await getUser(client, platformAdmin.id)

        expect(user.user_groups[0].group.id).toBe(platformGroup.id)
      })

      test('a super admin should be able to create a partner admin user', async () => {
        const client = createClient(HASURA_ROLES.admin)

        partnerAdmin = await createUser(client, {
          email: 'partner_admin@email.com',
        })

        expect(partnerAdmin.email).toBe('partner_admin@email.com')
      })

      test('a super admin should be able to create a partner normal user', async () => {
        const client = createClient(HASURA_ROLES.admin)

        partnerUser = await createUser(client, {
          email: 'partner_user@email.com',
        })

        expect(partnerUser.email).toBe('partner_user@email.com')
      })

      test('a super admin should be able to create a company admin user', async () => {
        const client = createClient(HASURA_ROLES.admin)

        companyAdmin = await createUser(client, {
          email: 'company_admin@email.com',
        })

        expect(companyAdmin.email).toBe('company_admin@email.com')
      })

      test('a super admin should be able to create a company normal user', async () => {
        const client = createClient(HASURA_ROLES.admin)

        companyUser = await createUser(client, {
          email: 'company_user@email.com',
        })

        expect(companyUser.email).toBe('company_user@email.com')
      })

      test('a super admin should be able to create a partner company admin user', async () => {
        const client = createClient(HASURA_ROLES.admin)

        partnerCompanyAdmin = await createUser(client, {
          email: 'partner_company_admin@email.com',
        })

        expect(partnerCompanyAdmin.email).toBe(
          'partner_company_admin@email.com'
        )
      })

      test('a super admin should be able to create a partner company normal user', async () => {
        const client = createClient(HASURA_ROLES.admin)

        partnerCompanyUser = await createUser(client, {
          email: 'partner_company_user@email.com',
        })

        expect(partnerCompanyUser.email).toBe('partner_company_user@email.com')
      })
    })

    describe('once a platform admin exists', () => {
      test('a platform admin should be able to create a partner group and the group should have the platform admin group as parent', async () => {
        const client = createClient(HASURA_ROLES.platformAdmin, {
          [CLAIMS.groupId]: platformGroup.id.toString(),
        })

        partnerGroup = await createGroup(client, {
          name: 'partner group',
          type: 'partner',
        })

        expect(partnerGroup.name).toBe('partner group')
        expect(partnerGroup.parent_id).toBe(platformGroup.id)
        expect(partnerGroup.type).toBe('partner')
      })

      test('a platform admin should be able to add users to one of its partner groups', async () => {
        const client = createClient(HASURA_ROLES.platformAdmin, {
          [CLAIMS.groupId]: platformGroup.id.toString(),
        })

        await addUserToGroup(client, {
          userId: partnerAdmin.id,
          groupId: partnerGroup.id,
        })

        await addUserToGroup(client, {
          userId: partnerUser.id,
          groupId: partnerGroup.id,
        })

        const user1 = await getUser(client, partnerAdmin.id)
        const user2 = await getUser(client, partnerUser.id)

        expect(user1.user_groups[0].group.id).toBe(partnerGroup.id)
        expect(user2.user_groups[0].group.id).toBe(partnerGroup.id)
      })

      test('a platform admin should be able to assign the admin role to one of the users of one of its partner groups', async () => {
        const client = createClient(HASURA_ROLES.platformAdmin, {
          [CLAIMS.groupId]: platformGroup.id.toString(),
        })

        const adminRole = await getRoleByName(client, APPLICATION_ROLES.admin)

        await assignRoleToUser(client, {
          userId: partnerAdmin.id,
          roleId: adminRole.id,
        })

        const user = await getUser(client, partnerAdmin.id)

        expect(user.user_roles[0].role.id).toBe(adminRole.id)
      })

      test('a platform admin should be able to create a company group and the group should have the platform admin group as parent', async () => {
        const client = createClient(HASURA_ROLES.platformAdmin, {
          [CLAIMS.groupId]: platformGroup.id.toString(),
        })

        companyGroup = await createGroup(client, {
          name: 'company group',
          type: 'company',
        })

        expect(companyGroup.name).toBe('company group')
        expect(companyGroup.parent_id).toBe(platformGroup.id)
        expect(companyGroup.type).toBe('company')
      })

      test('a platform admin should be able to add users to one of it company groups', async () => {
        const client = createClient(HASURA_ROLES.platformAdmin, {
          [CLAIMS.groupId]: platformGroup.id.toString(),
        })

        await addUserToGroup(client, {
          userId: companyAdmin.id,
          groupId: companyGroup.id,
        })

        await addUserToGroup(client, {
          userId: companyUser.id,
          groupId: companyGroup.id,
        })

        const user1 = await getUser(client, companyAdmin.id)
        const user2 = await getUser(client, companyUser.id)

        expect(user1.user_groups[0].group.id).toBe(companyGroup.id)
        expect(user2.user_groups[0].group.id).toBe(companyGroup.id)
      })

      test('a platform admin should be able to assign the admin role to one of the users of one of its company groups', async () => {
        const client = createClient(HASURA_ROLES.platformAdmin, {
          [CLAIMS.groupId]: platformGroup.id.toString(),
        })

        const adminRole = await getRoleByName(client, APPLICATION_ROLES.admin)

        await assignRoleToUser(client, {
          userId: companyAdmin.id,
          roleId: adminRole.id,
        })

        const user = await getUser(client, companyAdmin.id)

        expect(user.user_roles[0].role.id).toBe(adminRole.id)
      })
    })

    describe('once a partner admin exists', () => {
      test('a partner admin should be able to create a company group and the group should have the partner group as parent', async () => {
        const client = createClient(HASURA_ROLES.partnerAdmin, {
          [CLAIMS.groupId]: partnerGroup.id.toString(),
        })

        partnerCompanyGroup = await createGroupWithDefaultType(client, {
          name: 'partner company group',
        })

        expect(partnerCompanyGroup.name).toBe('partner company group')
        expect(partnerCompanyGroup.parent_id).toBe(partnerGroup.id)
        expect(partnerCompanyGroup.type).toBe('company')
      })

      test('a partner admin should not be able to create a partner group', async () => {
        const client = createClient(HASURA_ROLES.partnerAdmin, {
          [CLAIMS.groupId]: partnerGroup.id.toString(),
        })

        await expect(
          createGroup(client, {
            name: 'partner company group',
            type: 'partner',
          })
        ).rejects.toThrow()
      })

      test('a partner admin should be able to add users to one of the groups owned by his group', async () => {
        const client = createClient(HASURA_ROLES.partnerAdmin, {
          [CLAIMS.groupId]: partnerGroup.id.toString(),
        })

        await addUserToGroup(client, {
          userId: partnerCompanyAdmin.id,
          groupId: partnerCompanyGroup.id,
        })

        await addUserToGroup(client, {
          userId: partnerCompanyUser.id,
          groupId: partnerCompanyGroup.id,
        })

        const user1 = await getUser(client, partnerCompanyAdmin.id)
        const user2 = await getUser(client, partnerCompanyUser.id)

        expect(user1.user_groups[0].group.id).toBe(partnerCompanyGroup.id)
        expect(user2.user_groups[0].group.id).toBe(partnerCompanyGroup.id)
      })

      test('a partner admin should be able to assign the admin role to one of the users in one of the groups owned by his group', async () => {
        const client = createClient(HASURA_ROLES.partnerAdmin, {
          [CLAIMS.groupId]: partnerGroup.id.toString(),
        })

        const adminRole = await getRoleByName(client, APPLICATION_ROLES.admin)

        await assignRoleToUser(client, {
          userId: partnerCompanyAdmin.id,
          roleId: adminRole.id,
        })

        const user = await getUser(client, partnerCompanyAdmin.id)

        expect(user.user_roles[0].role.id).toBe(adminRole.id)
      })
    })

    describe('once a company admin exists', () => {
      test('a company admin should not be able to create a group', async () => {
        const client = createClient(HASURA_ROLES.companyAdmin, {
          [CLAIMS.groupId]: companyGroup.id.toString(),
        })

        await expect(
          createGroup(client, {
            name: 'company sub group',
            type: 'company',
          })
        ).rejects.toThrow()
      })
    })

    describe('once a partner company admin exists', () => {
      test('a partner company admin should not be able to create a group', async () => {
        const client = createClient(HASURA_ROLES.companyAdmin, {
          [CLAIMS.groupId]: partnerCompanyGroup.id.toString(),
        })

        await expect(
          createGroup(client, {
            name: 'partner company sub group',
            type: 'company',
          })
        ).rejects.toThrow()
      })
    })

    describe('once all user profiles exist', () => {
      test('a company admin should be able to see only his own group', async () => {
        const client = createClient(HASURA_ROLES.companyAdmin, {
          [CLAIMS.groupId]: companyGroup.id.toString(),
        })

        const groups = await listGroups(client)

        expect(groups.length).toBe(1)
        expect(groups).toContainEqual(companyGroup)
      })

      test('a company admin should be able to see only the users of his own group', async () => {
        const client = createClient(HASURA_ROLES.companyAdmin, {
          [CLAIMS.groupId]: companyGroup.id.toString(),
        })

        const users = await listUsers(client)

        expect(users.length).toBe(2)
        expect(users).toContainEqual(companyAdmin)
        expect(users).toContainEqual(companyUser)
      })

      test('a partner company admin should be able to see only his own group', async () => {
        const client = createClient(HASURA_ROLES.companyAdmin, {
          [CLAIMS.groupId]: partnerCompanyGroup.id.toString(),
        })

        const groups = await listGroups(client)

        expect(groups.length).toBe(1)
        expect(groups).toContainEqual(partnerCompanyGroup)
      })

      test('a partner company admin should be able to see only the users of his own group', async () => {
        const client = createClient(HASURA_ROLES.companyAdmin, {
          [CLAIMS.groupId]: partnerCompanyGroup.id.toString(),
        })

        const users = await listUsers(client)

        expect(users.length).toBe(2)
        expect(users).toContainEqual(partnerCompanyAdmin)
        expect(users).toContainEqual(partnerCompanyUser)
      })

      test('a partner admin should be able to see his own group and its children', async () => {
        const client = createClient(HASURA_ROLES.partnerAdmin, {
          [CLAIMS.groupId]: partnerGroup.id.toString(),
        })

        const groups = await listGroups(client)

        expect(groups.length).toBe(2)
        expect(groups).toContainEqual(partnerGroup)
        expect(groups).toContainEqual(partnerCompanyGroup)
      })

      test('a partner admin should be able to see the users of his group and those of its children groups', async () => {
        const client = createClient(HASURA_ROLES.partnerAdmin, {
          [CLAIMS.groupId]: partnerGroup.id.toString(),
        })

        const users = await listUsers(client)

        expect(users.length).toBe(4)
        expect(users).toContainEqual(partnerAdmin)
        expect(users).toContainEqual(partnerUser)
        expect(users).toContainEqual(partnerCompanyAdmin)
        expect(users).toContainEqual(partnerCompanyUser)
      })

      test('a platform admin should be able to see his own group and its children recursively', async () => {
        const client = createClient(HASURA_ROLES.platformAdmin, {
          [CLAIMS.groupId]: platformGroup.id.toString(),
        })

        const groups = await listGroups(client)

        expect(groups.length).toBe(4)
        expect(groups).toContainEqual(platformGroup)
        expect(groups).toContainEqual(companyGroup)
        expect(groups).toContainEqual(partnerGroup)
        expect(groups).toContainEqual(partnerCompanyGroup)
      })

      test('a platform admin should be able to see the users of his group and those of its children groups, recursively', async () => {
        const client = createClient(HASURA_ROLES.platformAdmin, {
          [CLAIMS.groupId]: platformGroup.id.toString(),
        })

        const users = await listUsers(client)

        expect(users.length).toBe(8)
        expect(users).toContainEqual(platformAdmin)
        expect(users).toContainEqual(platformUser)
        expect(users).toContainEqual(partnerAdmin)
        expect(users).toContainEqual(partnerUser)
        expect(users).toContainEqual(partnerCompanyAdmin)
        expect(users).toContainEqual(partnerCompanyUser)
        expect(users).toContainEqual(companyAdmin)
        expect(users).toContainEqual(companyUser)
      })
    })
  })
})
