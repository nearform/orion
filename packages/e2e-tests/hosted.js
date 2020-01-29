import e2eTests from './e2e.test'
import { config, url } from './config'
import getRoles from './roles'

// Run tests with url from .env
const roles = getRoles(url, config)
e2eTests(url, config, roles)
