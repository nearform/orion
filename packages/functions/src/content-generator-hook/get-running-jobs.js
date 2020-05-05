const request = require('request')

const CIRCLE_PROJECT_SLUG = 'github/nearform/orion'

const getRunningJobs = ORION_CIRCLE_CI_API_USER_TOKEN => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://circleci.com/api/v1.1/project/${CIRCLE_PROJECT_SLUG}/tree/staging?circle-token=${ORION_CIRCLE_CI_API_USER_TOKEN}`,
      method: 'GET',
      headers: {
        'Accept-Encoding': 'json',
        Accept: 'application/json',
      },
    }
    request(options, (error, response, body) => {
      if (error) {
        return reject(error)
      }

      return resolve(body)
    })
  })
}

module.exports = {
  getRunningJobs,
}
