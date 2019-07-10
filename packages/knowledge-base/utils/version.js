const { CI, CIRCLE_BRANCH, CIRCLE_BUILD_NUM } = process.env

function getApplicationVersion(localVersion) {
  return CI ? `${CIRCLE_BRANCH}/${CIRCLE_BUILD_NUM}` : `local/${localVersion}`
}

module.exports = {
  getApplicationVersion,
}
