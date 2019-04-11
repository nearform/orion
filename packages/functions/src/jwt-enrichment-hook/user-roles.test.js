import { getAllowedRoles, selectDefaultRole } from './user-roles'

const userWithoutRoles = {
  id: 1,
  name: 'test666',
  user_roles: [],
  user_groups: [],
}

const userWithRoles = {
  id: 1,
  name: 'test666',
  user_roles: [
    {
      role: {
        id: 2,
        name: 'non-member',
        order: 2,
      },
    },
    {
      role: {
        id: 1,
        name: 'admin',
        order: 1,
      },
    },
  ],
}

const userWithDisjointRolesAndGroups = {
  id: 1,
  name: 'test666',
  user_roles: [
    {
      role: {
        id: 1,
        name: 'admin',
        order: 1,
      },
    },
  ],
  user_groups: [
    {
      group: {
        id: 1,
        name: 'NearForm',
        roles: [
          {
            role: {
              id: 2,
              name: 'non-member',
              order: 2,
            },
          },
        ],
      },
    },
  ],
}

const userWithOverlappingRolesAndGroups = {
  id: 1,
  name: 'test666',
  user_roles: [
    {
      role: {
        id: 1,
        name: 'admin',
        order: 1,
      },
    },
  ],
  user_groups: [
    {
      group: {
        id: 1,
        name: 'NearForm',
        roles: [
          {
            role: {
              id: 1,
              name: 'admin',
              order: 1,
            },
          },
          {
            role: {
              id: 2,
              name: 'non-member',
              order: 2,
            },
          },
        ],
      },
    },
  ],
}

const uniqueRoles = [
  {
    id: 2,
    name: 'non-member',
    order: 2,
  },
  {
    id: 1,
    name: 'admin',
    order: 1,
  },
]

describe('getAllowedRoles', () => {
  it('should return empty if user has no roles', () => {
    expect(getAllowedRoles(userWithoutRoles)).toEqual([])
  })

  it('should return user roles if user has roles', () => {
    const allowedRoles = getAllowedRoles(userWithRoles)

    expect(allowedRoles.length).toBe(2)

    allowedRoles.forEach(role => {
      expect(role).toBeDefined()
    })
  })

  it('should return union of user and group roles if user has roles and group', () => {
    const allowedRoles = getAllowedRoles(userWithDisjointRolesAndGroups)

    expect(allowedRoles.length).toBe(2)

    allowedRoles.forEach(role => {
      expect(role).toBeDefined()
    })
  })

  it('should return unique union of user and group roles if user has roles and group with overlapping roles', () => {
    const allowedRoles = getAllowedRoles(userWithOverlappingRolesAndGroups)

    expect(allowedRoles.length).toBe(2)

    allowedRoles.forEach(role => {
      expect(role).toBeDefined()
    })
  })
})

describe('selectDefaultRole', () => {
  it('should return the role with least order', () => {
    expect(selectDefaultRole(uniqueRoles)).toBe(uniqueRoles[1])
  })
})
