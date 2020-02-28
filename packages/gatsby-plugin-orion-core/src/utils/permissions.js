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

const comparePerms = (userSet, reqString, divider) => {
  const reqSet = reqString.split(divider)
  const val = reqSet.reduce((acc, curr) =>
    userSet[curr] === true ? acc++ : acc
  )
  return divider === '&' ? val === reqSet.length : val > 0
}

// Use: checkPerms({user: 'create&read&update&delete', page: 'read|update' }, true)
const checkPermissions = (userPerms, permReqs, all = true) => {
  let hasPerms = false
  for (const permSet in permReqs) {
    if (permissions.keys.includes(permSet)) {
      hasPerms = comparePerms(
        userPerms,
        permReqs[permSet],
        permReqs[permSet].includes('&') ? '&' : '|'
      )
      if (hasPerms !== all) {
        break
      }
    }
  }

  return hasPerms
}

export default {
  createNumericRolePermissions,
  checkPermissions,
}
