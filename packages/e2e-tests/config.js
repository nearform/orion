import dotenv from 'dotenv'
dotenv.config()

const url = process.env.E2E_TESTS_REMOTE_URL

const config = {
  httpAuth: {
    username: process.env.E2E_TESTS_REMOTE_USERNAME,
    password: process.env.E2E_TESTS_REMOTE_PASSWORD,
  },
  paths: {
    home: '/',
    admin: '/admin',
    allUsers: '/admin/all-users',
    pendingUsers: '/admin/pending-users',
    groups: '/admin/groups',
    login: '/auth',
  },
  users: {
    admin: {
      username: process.env.E2E_TESTS_ADMIN_USERNAME,
      password: process.env.E2E_TESTS_ADMIN_PASSWORD,
    },
  },
}

export { config, url }
