export function filterOldScores(assessment, assessmentData) {
  // This is to filter out old unused scores in database that cause errors
  if (assessment && assessment.scoring && assessmentData) {
    assessment.pillars.forEach(pillar => {
      if (!pillar.scoring) return

      const scoreKeys = []
      pillar.scoring.forEach(({ scores }) => {
        scoreKeys.push(...scores.map(({ key }) => key))
      })
      assessmentData.scoring.forEach(criterion => {
        if (pillar.key !== criterion.pillar_key) return

        Object.keys(criterion.scoring_values).forEach(key => {
          Object.keys(criterion.scoring_values[key]).forEach(scoreKey => {
            if (!scoreKeys.includes(scoreKey))
              delete criterion.scoring_values[key][scoreKey]
          })
        })
      })
    })
  }
  return assessmentData
}
