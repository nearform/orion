import get from 'lodash/get'

export function getCustomClaims(user) {
  return {
    'x-orion-claims': JSON.stringify({
      'x-assess-base-contributor':
        get(user, 'assessment_contributors_aggregate.aggregate.count', 0) > 0,
      'x-assess-base-assessor':
        get(user, 'assessment_assessors_aggregate.aggregate.count', 0) > 0,
    }),
  }
}
