import T from 'prop-types'
import get from 'lodash/get'
import { config } from '../../../theme.es'

const SLIDER_STEP = 5

const getPointScore = (percentScore, weight, possiblePoints) =>
  Math.round((percentScore * weight * possiblePoints) / 100)

function getOverallScore(chartData) {
  return chartData.reduce((acc, dataItem) => acc + dataItem.pointScore, 0)
}

function calculatePartsMean(scores) {
  if (!scores.length) return 0
  return Math.min(
    scores.reduce((sum, scoreItem) => {
      const scoreValue = scoreItem.score

      return sum + scoreValue
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
      if (!assessmentData.scoring) return chartData

      const pillarColor = pillarColors[pillarIndex]
      const pillarScores = assessmentData.scoring.filter(
        scoresByPillar => scoresByPillar.pillar_key === pillarKey
      )

      let skipFlag = false
      criteriaDef.forEach(criterionDef => {
        const scoringDef =
          criterionDef.scoring || pillarDef.scoring || assessmentDef.scoring
        const scoringRules =
          criterionDef.scoringRules ||
          pillarDef.scoringRules ||
          assessmentDef.scoringRules ||
          {}

        if (
          skipFlag ||
          !pillarScores.some(
            pillarScore => pillarScore.criterion_key === criterionDef.key
          )
        ) {
          skipFlag = true
          return
        }

        chartData.push(
          getScoresByCritera(
            criterionDef,
            pillarScores,
            pillarKey,
            scoringDef,
            scoringRules,
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
  scoringRules,
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

  const { criteriaWeighting, [assessmentKey]: scoringPoints } = config.scoring

  const compositeKey = `${pillarKey}_${criterionKey}`
  const criterionPath = `assessment/${assessmentKey}/${pillarKey}/${criterionKey}`

  const chartDataByCriterionParts = scoreValuesByCriterion
    .map(scoreValuesByCriterionPart =>
      getScoresbyCriterionPart(
        scoreValuesByCriterionPart,
        criterionPartsDefs,
        scoringDef,
        scoringRules,
        compositeKey,
        criterionPath,
        scoringPoints
      )
    )
    .sort((a, b) => (a.label > b.label && 1) || (a.label < b.label && -1) || 0)

  const criteriaScore = calculatePartsMean(chartDataByCriterionParts)
  const pointCriteriaScore = getPointScore(
    criteriaScore,
    criteriaWeighting[criterionKey],
    scoringPoints
  )

  return {
    key: compositeKey,
    label: criterionName,
    color: pillarColor,
    scores: chartDataByCriterionParts,
    score: criteriaScore,
    pointScore: pointCriteriaScore,
    weighting: criteriaWeighting[criterionKey],
  }
}

function getScoresbyCriterionPart(
  scoreValuesByCriterionPart,
  criterionPartsDefs,
  scoringDef,
  scoringRules,
  previousKey,
  criterionPath,
  scoringPoints
) {
  const {
    part_number: partNumber,
    scoring_values: scoringValues,
  } = scoreValuesByCriterionPart
  const { tables: partTablesDef } = criterionPartsDefs[partNumber - 1]
  const partScoringPoints = scoringPoints / partTablesDef.length

  const cap = roundBySliderStep(get(scoringValues, scoringRules.capBy, 100))

  const scoresByScoringItems = scoringDef.reduce(
    (scoringData, scoringGroupDef) =>
      scoringValues[scoringGroupDef.key]
        ? [
            ...scoringData,
            ...getScoresFromScoringGroups(
              scoringValues[scoringGroupDef.key],
              scoringGroupDef.scores
            ),
          ]
        : scoringData,
    []
  )

  const score = Math.min(
    roundBySliderStep(calculatePartsMean(scoresByScoringItems)),
    cap
  )
  const pointScore = getPointScore(score, 1, partScoringPoints)

  return {
    key: `${previousKey}_${partNumber}`,
    label: partTablesDef.map(table => table.name).join(', '),
    scores: scoresByScoringItems,
    score,
    pointScore,
    path: `${criterionPath}/${partNumber}`,
  }
}

function roundBySliderStep(num) {
  return Math.round(num / SLIDER_STEP) * SLIDER_STEP
}

function getScoresFromScoringGroups(scoringValues, def) {
  return Object.entries(scoringValues).map(([key, score]) => {
    const { name: label } = def.find(scoreDef => scoreDef.key === key)

    return {
      score: roundBySliderStep(score),
      pointScore: '--',
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

export { getOverallScore, chartDataShape, getChartData }
