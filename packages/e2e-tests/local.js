import e2eTests from './e2e.test'
import { config } from './config'
import getRoles from './roles'

// Run tests on localhost instead of url in .env
const url = 'http://localhost:8000'
const roles = getRoles(url, config)

e2eTests(url, config, roles)
