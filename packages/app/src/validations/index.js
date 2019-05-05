const { validateAssessment } = require('./validators')
const { validateAssessmentFiles } = require('./runners')

module.exports = {
  validateAssessment,
  validateAssessmentFiles,
}
