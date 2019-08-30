import T from 'prop-types'

function getWeightedScore(dataItem) {
  return dataItem.score * (dataItem.weighting || 1)
}

function getOverallScore(chartData) {
  return chartData.reduce(
    (acc, dataItem) => acc + getWeightedScore(dataItem),
    0
  )
}

function calculateWeightedMean(scores) {
  return (
    scores.reduce((sum, scoreItem) => {
      const weighting = scoreItem.weighting || 1
      const scoreValue = scoreItem.score

      return sum + scoreValue * weighting
    }, 0) / scores.length
  )
}

function getChartData(assessmentDef, assessmentData, pillarColors) {
  /**
   * Collates heirarchical data, calculating weighted average "score" at each level:
   * - Criterion (color per pillar)           e.g. "Purpose & Strategy", "Execution"
   *   - Criterion-part                       Takes names from criterion part's tables
   *     # (skips this level) - Scoring group e.g. "Relevance & Usability", "Performance"
   *       - Score from one scoring slider    e.g. "Scope & Relevance", "Integrity"
   *
   * TODO: Optimise and simplify when sure that business logic is sound.
   */

  if (!assessmentData) return null

  const chartData = assessmentDef.pillars.reduce(
    (chartData, pillarDef, pillarIndex) => {
      const { key: pillarKey, criteria: criteriaDef } = pillarDef

      const scoringDef = pillarDef.scoring || assessmentDef.scoring

      if (!scoringDef || !assessmentData.scoring) return chartData

      const pillarColor = pillarColors[pillarIndex]
      const pillarScores = assessmentData.scoring.filter(
        scoresByPillar => scoresByPillar.pillar_key === pillarKey
      )

      criteriaDef.forEach(criterionDef => {
        if (
          !pillarScores.some(
            pillarScore => pillarScore.criterion_key === criterionDef.key
          )
        ) {
          return
        }
        chartData.push(
          getScoresByCritera(
            criterionDef,
            pillarScores,
            pillarKey,
            scoringDef,
            pillarColor,
            assessmentDef.key
          )
        )
      })

      return chartData
    },
    []
  )

  return chartData
}

function getScoresByCritera(
  criterionDef,
  pillarScores,
  pillarKey,
  scoringDef,
  pillarColor,
  assessmentKey
) {
  const {
    name: criterionName,
    key: criterionKey,
    parts: criterionPartsDefs,
  } = criterionDef

  const scoreValuesByCriterion = pillarScores.filter(
    criterionPartScore => criterionPartScore.criterion_key === criterionKey
  )

  const compositeKey = `${pillarKey}_${criterionKey}`
  const criterionPath = `assessment/${assessmentKey}/${pillarKey}/${criterionKey}/`

  const chartDataByCriterionParts = scoreValuesByCriterion.map(
    scoreValuesByCriterionPart =>
      getScoresbyCriterionPart(
        scoreValuesByCriterionPart,
        criterionPartsDefs,
        scoringDef,
        compositeKey,
        criterionPath
      )
  )

  return {
    key: compositeKey,
    label: criterionName,
    color: pillarColor,
    scores: chartDataByCriterionParts,
    score: calculateWeightedMean(chartDataByCriterionParts),
  }
}

function getScoresbyCriterionPart(
  scoreValuesByCriterionPart,
  criterionPartsDefs,
  scoringDef,
  previousKey,
  criterionPath
) {
  const {
    part_number: partNumber,
    scoring_values: scoringValues,
  } = scoreValuesByCriterionPart
  const { tables: partTablesDef } = criterionPartsDefs[partNumber - 1]

  const scoresByScoringItems = scoringDef.reduce(
    (scoringData, scoringGroupDef) => [
      ...scoringData,
      ...getScoresFromScoringGroups(
        scoringValues[scoringGroupDef.key],
        scoringGroupDef.scores
      ),
    ],
    []
  )

  return {
    key: `${previousKey}_${partNumber}`,
    label: partTablesDef.map(table => table.name).join(', '),
    scores: scoresByScoringItems,
    score: calculateWeightedMean(scoresByScoringItems),
    path: `${criterionPath}/${partNumber}`,
  }
}

function getScoresFromScoringGroups(scoringValues, def) {
  return Object.entries(scoringValues).map(([key, score]) => {
    const { weighting, name: label } = def.find(
      scoreDef => scoreDef.key === key
    )

    return {
      score,
      weighting,
      key,
      label,
    }
  })
}

const chartDataShape = T.shape({
  score: T.number.isRequired,
  color: T.string,
  weighting: T.number,
  label: T.string.isRequired,
  key: T.string.isRequired,
})

export { getWeightedScore, getOverallScore, chartDataShape, getChartData }
