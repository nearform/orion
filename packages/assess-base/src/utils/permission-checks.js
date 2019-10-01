import get from 'lodash/get'

export function getCanEditAssesors(groupId, assessment) {
  if (!assessment) return false
  const { owner, internal } = assessment
  if (internal) {
    return get(owner, 'user_groups[0].group.id', false) === parseInt(groupId)
  } else {
    return (
      get(owner, 'user_groups[0].group.parent_id', false) === parseInt(groupId)
    )
  }
}

export function getCanEditContributors(groupId, assessment) {
  if (!assessment) return false
  return (
    get(assessment, 'owner.user_groups[0].group.id', false) ===
    parseInt(groupId)
  )
}
