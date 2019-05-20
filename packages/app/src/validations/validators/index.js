const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true, ownProperties: true })
const assessmentsSchema = require('../schemas/assessment')
const defSchema = require('../schemas/definitions')
const assessmentValidate = ajv.addSchema(defSchema).compile(assessmentsSchema)

function validateAssessment(data) {
  const valid = assessmentValidate(data)
  return {
    valid,
    errors: assessmentValidate.errors,
  }
}

module.exports = {
  validateAssessment,
}
