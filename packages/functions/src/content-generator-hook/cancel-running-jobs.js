const https = require('https')

const { getRunningJobs } = require('./get-running-jobs')

const CIRCLE_PROJECT_SLUG = 'github/nearform/orion'

const cancelJob = ({ ORION_CIRCLE_CI_API_USER_TOKEN, jobNumber }) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      port: 443,
      hostname: 'circleci.com',
      path: `/api/v2/project/${CIRCLE_PROJECT_SLUG}/job/${jobNumber}/cancel?circle-token=${ORION_CIRCLE_CI_API_USER_TOKEN}`,
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

const cancelRunningJobs = async ORION_CIRCLE_CI_API_USER_TOKEN => {
  try {
    const response = await getRunningJobs(ORION_CIRCLE_CI_API_USER_TOKEN)
    const data = JSON.parse(response)
    const promises = data
      .filter(
        job =>
          (job.status === 'running' ||
            job.status === 'not_running' ||
            job.status === 'queued') &&
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
