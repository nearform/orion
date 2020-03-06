const permissions = {
  pages: {
    create: 4,
    read: 1,
    update: 2,
    delete: 8,
  },
  articles: {
    create: 64,
    read: 16,
    update: 32,
    delete: 128,
  },
  users: {
    create: 1024,
    read: 256,
    update: 512,
    delete: 2048,
  },
}

/**
 * Converts a permission set from an object into a boolean-encoded integer for easy
 * storage and permission-checking
 *
 * @param {object} permSets Role Permissions in format as fetched from GraphQL
 * @return {number} Role permissions
 */
const createNumericRolePermissions = permSets => {
  const numericPerms = permSets.reduce((acc, curr) => {
    for (const key in curr) {
      if (['create', 'read', 'update', 'delete'].includes(key)) {
        acc += curr[key] === true ? permissions[curr.permission_set][key] : 0
      }
    }

    return acc
  }, 0)

  return numericPerms
}

export { permissions, createNumericRolePermissions }
