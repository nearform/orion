const { version } = require('../package.json')

const { CI, CIRCLE_BRANCH, CIRCLE_BUILD_NUM } = process.env

function getApplicationVersion() {
  return CI ? `${CIRCLE_BRANCH}/${CIRCLE_BUILD_NUM}` : `local/${version}`
}

module.exports = {
  getApplicationVersion,
}
