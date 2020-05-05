const request = require('request')

const { getRunningJobs } = require('./get-running-jobs')

const CIRCLE_PROJECT_SLUG = 'github/nearform/orion'

const cancelJob = ({ ORION_CIRCLE_CI_API_USER_TOKEN, jobNumber }) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://circleci.com/api/v2/project/${CIRCLE_PROJECT_SLUG}/job/${jobNumber}/cancel?circle-token=${ORION_CIRCLE_CI_API_USER_TOKEN}`,
      method: 'POST',
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

const cancelRunningJobs = async ORION_CIRCLE_CI_API_USER_TOKEN => {
  try {
    const response = await getRunningJobs(ORION_CIRCLE_CI_API_USER_TOKEN)
    const data = JSON.parse(response)
    const promises = data
      .filter(
        job =>
          (job.status === 'running' || job.status === 'not_running') &&
          job.workflows.workflow_name === 'generate-view-content'
      )
      .map(job => {
        console.log(`Cancelling job: ${job.build_num}`)
        return cancelJob({
          ORION_CIRCLE_CI_API_USER_TOKEN,
          jobNumber: job.build_num,
        })
      })

    return Promise.all(promises)
  } catch (error) {
    console.warn(error.message)
  }
}

module.exports = {
  cancelRunningJobs,
}
