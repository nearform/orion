import { ASSESSMENT_STATUS } from 'components'

export function assessmentInProgress(assessmentData) {
  return assessmentInStatus(assessmentData, ASSESSMENT_STATUS.inProgress)
}

export function assessmentSubmitted(assessmentData) {
  return assessmentInStatus(assessmentData, ASSESSMENT_STATUS.submitted)
}

function assessmentInStatus(assessmentData, status) {
  if (!assessmentData) return false

  return assessmentData.status === status
}
