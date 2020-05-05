const AWS = require('aws-sdk')
const https = require('https')
const { cancelRunningJobs } = require('./cancel-running-jobs')

const region = 'eu-west-1'
const secretName = 'ORION_CIRCLE_CI_API_USER_TOKEN'
const CIRCLE_PROJECT_SLUG = 'github/nearform/orion'

const client = new AWS.SecretsManager({
  region,
})

const getCircleCiApiKey = async () => {
  return new Promise((resolve, reject) => {
    client.getSecretValue({ SecretId: secretName }, function(err, data) {
      if (err) {
        console.log('error:', err)
        reject()
        throw err
      } else {
        resolve({ secret: data.SecretString })
      }
    })
  })
}

exports.handler = async () => {
  const { secret } = await getCircleCiApiKey()
  const { ORION_CIRCLE_CI_API_USER_TOKEN } = JSON.parse(secret)

  await cancelRunningJobs(ORION_CIRCLE_CI_API_USER_TOKEN)

  const bodyData = JSON.stringify({
    branch: 'staging',
    parameters: {
      regenerate_view_only: true, // eslint-disable-line camelcase
    },
  })
  const options = {
    hostname: `circleci.com`,
    port: 443,
    path: `/api/v2/project/${CIRCLE_PROJECT_SLUG}/pipeline?circle-token=${ORION_CIRCLE_CI_API_USER_TOKEN}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': bodyData.length,
    },
  }

  await postToCircleCi({ options, bodyData })

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  }
}

function postToCircleCi({ options, bodyData }) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      res.on('data', d => {
        process.stdout.write(d)
        resolve()
      })
    })

    req.on('error', error => {
      console.error(error)
      reject()
    })
    req.write(bodyData)
    req.end()
  })
}
