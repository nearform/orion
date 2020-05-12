const https = require('https')

const CIRCLE_PROJECT_SLUG = 'github/nearform/orion'

const getRunningJobs = ORION_CIRCLE_CI_API_USER_TOKEN => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      port: 443,
      hostname: 'circleci.com',
      path: `/api/v1.1/project/${CIRCLE_PROJECT_SLUG}/tree/staging?circle-token=${ORION_CIRCLE_CI_API_USER_TOKEN}`,
      headers: {
        'Accept-Encoding': 'json',
        Accept: 'application/json',
      },
    }

    const req = https.request(options, res => {
      const chunks = []

      res.on('data', chunk => {
        chunks.push(chunk)
      })

      res.on('end', () => {
        const body = Buffer.concat(chunks)
        console.log(body.toString())
        resolve(body)
      })

      res.on('error', error => {
        console.error(error)
        reject(error)
      })
    })
    req.end()
  })
}

module.exports = {
  getRunningJobs,
}
