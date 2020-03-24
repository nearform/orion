const axios = require('axios').default
const pWaitFor = require('p-wait-for')

cloneDb()

async function cloneDb() {
  // Make sure the local hasura is ready (this could be delayed by docker-compose up)
  await waitForLocalHasura()

  // Export the data and metadata
  const pgData = await exportPgData()
  const metadata = await exportMetadata()

  // The import order is important since hasura enums must have rows before the metadata can be applied
  // See:
  // First import the data (including the enum table rows), then import the metadata
  await importPgData(pgData)
  await importMetadata(metadata)

  console.log('Clone Success!')
}

async function waitForLocalHasura() {
  await pWaitFor(hasuraReady, { interval: 200, timeout: 20 * 1000 })

  async function hasuraReady() {
    try {
      const { data: status } = await axios(
        // See: https://hasura.io/docs/1.0/graphql/manual/api-reference/health.html#health-api-reference
        `${process.env.HASURA_LOCAL_BASE_URL}/healthz`
      )
      console.log('Hasura server status:', status)

      // A 200 status indicates the server is healthy, return true to stop the polling
      return true
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log('The server is not healthy:', error.response.data)
        throw error
      }

      console.log('Hasura server not ready:', error.message)
      return false
    }
  }
}

async function exportPgData() {
  const axiosOptions = {
    ...hasuraAxiosOptions({
      baseURL: process.env.HASURA_REMOTE_BASE_URL,
      adminSecret: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    }),
    // See https://hasura.io/docs/1.0/graphql/manual/api-reference/pgdump.html
    url: 'v1alpha1/pg_dump',
    data: {
      opts: ['-O', '-x', '--schema', 'public', '--column-inserts'],
      clean_output: true, // eslint-disable-line camelcase
    },
  }

  const { data: pgData } = await request(axiosOptions)
  console.log('Exported postgres data:', pgData)
  return pgData
}

async function exportMetadata() {
  const axiosOptions = {
    ...hasuraAxiosOptions({
      baseURL: process.env.HASURA_REMOTE_BASE_URL,
      adminSecret: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    }),
    url: 'v1/query',
    data: {
      // See: https://hasura.io/docs/1.0/graphql/manual/api-reference/schema-metadata-api/manage-metadata.html
      type: 'export_metadata',
      args: {},
    },
  }

  const { data: hasuraMetaData } = await request(axiosOptions)
  console.log('Exported metadata:', hasuraMetaData)
  return hasuraMetaData
}

async function importPgData(sql) {
  const axiosOptions = {
    ...hasuraAxiosOptions({
      baseURL: process.env.HASURA_LOCAL_BASE_URL,
    }),
    url: 'v1/query',
    data: {
      // See: https://hasura.io/docs/1.0/graphql/manual/api-reference/schema-metadata-api/run-sql.html
      type: 'run_sql',
      args: {
        sql,
      },
    },
  }

  const { data: results } = await request(axiosOptions)
  console.log('Import Postgres data result:', results)
  return results
}

async function importMetadata(metadata) {
  const axiosOptions = {
    ...hasuraAxiosOptions({
      baseURL: process.env.HASURA_LOCAL_BASE_URL,
    }),
    url: 'v1/query',
    data: {
      // See: https://hasura.io/docs/1.0/graphql/manual/api-reference/schema-metadata-api/manage-metadata.html
      type: 'replace_metadata',
      args: metadata,
    },
  }

  const { data: results } = await request(axiosOptions)
  console.log('Import metadata results:', results)
  return results
}

function hasuraAxiosOptions({ baseURL, adminSecret }) {
  const axiosOptions = {
    method: 'POST',
    baseURL,
    headers: {
      'X-Hasura-Role': 'admin',
    },
  }

  if (adminSecret !== undefined) {
    axiosOptions.headers['X-Hasura-Admin-Secret'] = adminSecret
  }

  return axiosOptions
}

async function request(...options) {
  try {
    return await axios(...options)
  } catch (error) {
    const thingsToLog = [error.message]

    if (error.response) {
      thingsToLog.push(error.response.status, error.response.data)
    }

    console.log('Request error', ...thingsToLog)
    throw error
  }
}
