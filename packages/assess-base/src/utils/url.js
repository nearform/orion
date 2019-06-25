export function getAssessmentId(location) {
  return parseInt(location.hash.replace('#', ''), 10)
}
