const { validateAssessment } = require('../validators')
const { getThemePaths } = require('../../../utils/paths')
const { loadJSONFilesFromDir } = require('../../../utils/file')

function validateAssessmentFiles(currentTheme, logger = console) {
  logger.info('Starting assessment validation.')
  let hasErrors = false

  const { themeAssessmentsPath } = getThemePaths(currentTheme)
  const assessmentFiles = loadJSONFilesFromDir(themeAssessmentsPath)

  for (const [filename, assessment] of Object.entries(assessmentFiles)) {
    const { valid, errors } = validateAssessment(assessment)

    logger.info(`${filename} ${valid ? 'OK' : 'NOK'}`)
    if (errors) {
      if (!hasErrors) hasErrors = true
      logger.error(errors)
    }
  }

  if (hasErrors) throw new Error('There were errors during validation.')
  logger.info('Finished validation.')
}

module.exports = {
  validateAssessmentFiles,
}
