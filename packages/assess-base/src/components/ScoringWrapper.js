import { useRef, useState, useEffect } from 'react'
import mean from 'lodash/mean'
import round from 'lodash/round'
import get from 'lodash/get'
import T from 'prop-types'
import { useMutation } from 'graphql-hooks'

import {
  insertAssessmentScoringDataMutation,
  updateAssessmentScoringDataMutation,
} from '../queries'

const SLIDER_STEP = 10

function getOverallValue(groupOverall, cap) {
  return groupOverall.length
    ? round(mean(groupOverall) / SLIDER_STEP) * SLIDER_STEP
    : 0
}

function getScoringData(
  assessmentData,
  scoringDef,
  pillar,
  criterion,
  partNumber
) {
  // Find the scoring date for the current part.
  const { id: scoringId, scoring_values: values } =
    assessmentData.scoring.find(
      s =>
        s.pillar_key === pillar.key &&
        s.criterion_key === criterion.key &&
        s.part_number === partNumber
    ) || {}

  // Get any previously saved data that is in latest def, ignore data dropped from
  // def, set new def keys to 0
  const scoringValues = scoringDef.reduce(
    (acc, scoringGroup) => ({
      ...acc,
      [scoringGroup.key]: scoringGroup.scores.reduce(
        (acc, score) => ({
          ...acc,
          [score.key]: get(values, `[${scoringGroup.key}][${score.key}]`, 0),
        }),
        {}
      ),
    }),
    {}
  )

  return {
    scoringId,
    scoringValues,
  }
}

function getCapDescription(capRule, scoringDef) {
  const fallback = `“${capRule[0]}: ${capRule[1]}”`
  const scoringGroup = scoringDef.find(group => group.key === capRule[0])
  if (!scoringGroup) return fallback

  const scoringSlider = scoringGroup.scores.find(
    group => group.key === capRule[1]
  )
  return `“${scoringGroup.name}: ${
    scoringSlider ? scoringSlider.name : capRule[1]
  }”`
}

export default function ScoringWrapper({
  assessmentId,
  assessmentData,
  pillar,
  scoringDef,
  scoringRules,
  criterion,
  partNumber,
  children,
}) {
  const { scoringId, scoringValues } = getScoringData(
    assessmentData,
    scoringDef,
    pillar,
    criterion,
    partNumber
  )

  const [currentScoringId, setCurrentScoringId] = useState(scoringId)
  // Keep the state in synch if the score is saved elsewhere (due to the watch in the parent)
  useEffect(() => setCurrentScoringId(scoringId), [scoringId])

  const [insertScoringData] = useMutation(insertAssessmentScoringDataMutation)
  const [updateScoringData] = useMutation(updateAssessmentScoringDataMutation)

  const submitRef = useRef({
    onChange: false,
    onChangeCommitted: false,
  })

  async function handleScoreChange(values) {
    if (currentScoringId) {
      await updateScoringData({
        variables: {
          id: currentScoringId,
          scoringValues: values,
        },
      })
    } else {
      const insertResult = await insertScoringData({
        variables: {
          assessmentId,
          pillarKey: pillar.key,
          criterionKey: criterion.key,
          partNumber,
          scoringValues: values,
        },
      })
      const newScoringId = get(
        insertResult,
        'data.insert_assessment_scoring.returning[0].id'
      )
      setCurrentScoringId(newScoringId)
    }
  }

  return children({
    SLIDER_STEP,
    getOverallValue,
    submitRef,
    handleScoreChange,
    getCapDescription,
    scoringValues,
    scoringRules,
    scoringDef,
  })
}

ScoringWrapper.propTypes = {
  assessmentId: T.number.isRequired,
  assessmentData: T.object.isRequired,
  pillar: T.object.isRequired,
  scoringDef: T.array.isRequired,
  criterion: T.object.isRequired,
  partNumber: T.number.isRequired,
}
