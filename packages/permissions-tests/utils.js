const { GraphQLClient } = require('graphql-request')
const jwt = require('jsonwebtoken')
const uuid = require('uuid/v1')

const {
  HASURA_GRAPHQL_API,
  HASURA_GRAPHQL_ADMIN_SECRET,
  HASURA_GRAPHQL_JWT_SECRET_KEY,
} = process.env

const HASURA_ROLES = {
  admin: 'admin',
  platformAdmin: 'platform-admin',
  partnerAdmin: 'partner-admin',
  companyAdmin: 'company-admin',
  user: 'user',
}

const APPLICATION_ROLES = {
  admin: 'admin',
}

const CLAIMS = {
  groupId: 'x-hasura-group-id',
  userId: 'x-hasura-user-id',
}

async function getDeleteMutations() {
  const schema = await adminClient.request(`
  {
    __schema {
      mutationType {
        name
        description
        kind
        fields {
          name
          
        }
      }
    }
  }
  `)

  return schema.__schema.mutationType.fields
    .map(f => f.name)
    .filter(name => /^delete/.test(name))
    .sort((a, b) => b.length - a.length)
}

async function deleteAllData(deleteMutations) {
  return await adminClient.request(`
    mutation deleteAllData {
      ${deleteMutations
        .map(
          mutation => `
      ${mutation}(where: {}) {
        affected_rows
      }
      `
        )
        .join('\n')}
    }
  `)
}

function generateJWT(hasuraDefaultRole, additionalClaims) {
  return jwt.sign(
    {
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': [hasuraDefaultRole],
        'x-hasura-default-role': hasuraDefaultRole,
        ...additionalClaims,
      },
    },
    HASURA_GRAPHQL_JWT_SECRET_KEY
  )
}

function createClient(role, additionalClaims) {
  return new GraphQLClient(HASURA_GRAPHQL_API, {
    headers: {
      authorization: `Bearer ${generateJWT(role, additionalClaims)}`,
    },
  })
}

const adminClient = new GraphQLClient(HASURA_GRAPHQL_API, {
  headers: {
    'x-hasura-admin-secret': HASURA_GRAPHQL_ADMIN_SECRET,
  },
})

function createApplicationRoles() {
  return adminClient.request(
    `
    mutation insertApplicationRoles($roles: [role_insert_input!]!) {
      insert_role(objects: $roles) {
        affected_rows
      }
    }
  `,
    {
      roles: Object.values(APPLICATION_ROLES).map((role, index) => ({
        name: role,
        order: index + 1,
      })),
    }
  )
}

async function createGroup(client, variables) {
  const {
    insert_group: {
      returning: [group],
    },
  } = await client.request(
    `
        mutation createGroup($name: String!, $type: String) {
          insert_group(objects: { name: $name, type: $type }) {
            returning {
              id
              name
              type
              parent_id
            }
          }
        }
    `,
    variables
  )

  return group
}

async function createGroupWithDefaultType(client, variables) {
  const {
    insert_group: {
      returning: [group],
    },
  } = await client.request(
    `
        mutation createGroup($name: String!) {
          insert_group(objects: { name: $name }) {
            returning {
              id
              name
              type
              parent_id
            }
          }
        }
    `,
    variables
  )

  return group
}

async function createUser(client, variables) {
  const {
    insert_user: {
      returning: [user],
    },
  } = await client.request(
    `
        mutation createUser($email: String!, $cognitoId: String!) {
          insert_user(objects: { email: $email, cognito_id: $cognitoId }) {
            returning {
              id
              email
            }
          }
        }
    `,
    { ...variables, cognitoId: uuid() }
  )

  return user
}

async function getUser(client, userId) {
  const { user_by_pk } = await client.request(
    `
  query getUser($id: Int!) {
    user_by_pk(id: $id) {
      id
      email
      user_groups {
        group {
          id
        }
      }
      user_roles {
        role {
          id
        }
      }
    }
  }
  `,
    { id: userId }
  )

  return user_by_pk
}

async function addUserToGroup(client, variables) {
  await client.request(
    `
  mutation addUserToGroup($userId: Int!, $groupId: Int!) {
    insert_user_group(objects: { user_id: $userId, group_id: $groupId }) {
      affected_rows
    }
  }
  `,
    variables
  )
}

async function getRoleByName(client, roleName) {
  const { role } = await client.request(
    `
  query getRoleByName($name: String!) {
    role(where: { name: { _eq: $name } }) {
      id
      name
    }
  }
  `,
    { name: roleName }
  )

  return role[0]
}

async function assignRoleToUser(client, variables) {
  await client.request(
    `
  mutation assignRoleToUser($userId: Int!, $roleId: Int!) {
    insert_user_role(objects: { user_id: $userId, role_id: $roleId }) {
      affected_rows
    }
  }
  `,
    variables
  )
}

async function listGroups(client) {
  const { group } = await client.request(`query {
    group {
      id
      name
      parent_id
      type
    }
  }`)

  return group
}

async function listUsers(client) {
  const { user } = await client.request(`query {
    user {
      id
      email
    }
  }`)

  return user
}

async function createAssessment(client, variables) {
  const {
    insert_assessment: {
      returning: [assessment],
    },
  } = await client.request(
    `
  mutation createAssessment($name: String!, $key: String!) {
    insert_assessment(objects: { name: $name, key: $key }) {
      returning {
        id
        name
        owner_id
      }
    }
  }`,
    { ...variables, key: uuid() }
  )

  return assessment
}

async function listAssessments(client) {
  const { assessment } = await client.request(`query {
    assessment {
      id
      name
      owner_id
    }
  }`)

  return assessment
}

async function assignContributorToAssessment(client, variables) {
  await client.request(
    `mutation assignContributorToAssessment($assessmentId: Int!, $contributorId: Int!) {
      insert_assessment_contributor(objects: { assessment_id: $assessmentId, contributor_id: $contributorId }) {
        affected_rows
      }
  }`,
    variables
  )
}

async function listContributors(client, variables) {
  const { assessment_contributor } = await client.request(
    `
  query listContributors($assessmentId: Int!) {
    assessment_contributor(where: { assessment_id: { _eq: $assessmentId } }) {
      assessment {
        id
        name
        owner_id
      }
      contributor {
        id
        email
      }
    }
  }`,
    variables
  )

  return assessment_contributor
}

module.exports = {
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
  createAssessment,
  listAssessments,
  assignContributorToAssessment,
  listContributors,
  HASURA_ROLES,
  APPLICATION_ROLES,
  CLAIMS,
}
