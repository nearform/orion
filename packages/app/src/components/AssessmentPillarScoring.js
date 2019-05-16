import React, { useRef, useState } from 'react'
import debounce from 'lodash/debounce'
import mean from 'lodash/mean'
import round from 'lodash/round'
import get from 'lodash/get'
import { useMutation } from 'graphql-hooks'
import { withTheme, Grid } from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { ScoringSlider } from 'components'
import T from 'prop-types'

import {
  insertAssessmentScoringDataMutation,
  updateAssessmentScoringDataMutation,
} from '../queries'

const SLIDER_STEP = 5

function getScoringData(assessmentData, pillar) {
  if (assessmentData.scoring[0]) {
    const { id, scoring_values } = assessmentData.scoring[0]

    return {
      scoringId: id,
      scoringValues: scoring_values,
    }
  }

  const scoringValues = pillar.scoring.reduce(
    (acc, scoringGroup) => ({
      ...acc,
      [scoringGroup.key]: scoringGroup.scores.reduce(
        (acc, score) => ({ ...acc, [score.key]: 0 }),
        {}
      ),
    }),
    {}
  )
  return {
    scoringId: null,
    scoringValues,
  }
}

const SAVE_SCORE_DEBOUNCE_TIME = 1000

function AssessmentPillarScoring({
  theme,
  assessmentId,
  assessmentData,
  pillar,
  criterion,
  partNumber,
  onScoreSaved,
}) {
  const { scoringId, scoringValues } = getScoringData(assessmentData, pillar)

  const [currentScoringId, setCurrentScoringId] = useState(scoringId)
  const [insertScoringData] = useMutation(insertAssessmentScoringDataMutation)
  const [updateScoringData] = useMutation(updateAssessmentScoringDataMutation)

  const submitRef = useRef()

  const debounceSubmit = debounce(
    e => submitRef.current(e),
    SAVE_SCORE_DEBOUNCE_TIME
  )

  async function handleScoreChange(values) {
    if (currentScoringId) {
      await updateScoringData({
        variables: {
          id: scoringId,
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

  return (
    <Formik onSubmit={handleScoreChange} initialValues={scoringValues}>
      {({ setFieldValue, handleSubmit, values }) => {
        submitRef.current = handleSubmit

        return (
          <Form>
            <Grid container direction="column" spacing={theme.spacing.unit * 2}>
              {pillar.scoring.map(scoringGroup => {
                const groupOverall =
                  round(
                    mean(Object.values(values[scoringGroup.key])) / SLIDER_STEP
                  ) * SLIDER_STEP

                return (
                  <Grid
                    key={scoringGroup.key}
                    item
                    container
                    spacing={theme.spacing.unit * 2}
                  >
                    {scoringGroup.scores.map(score => {
                      const fieldName = `${scoringGroup.key}.${score.key}`

                      return (
                        <Grid item key={score.key} xs>
                          <Field name={fieldName}>
                            {({ field }) => (
                              <ScoringSlider
                                {...field}
                                color={field.value ? 'secondary' : null}
                                step={SLIDER_STEP}
                                label={score.name}
                                onChange={(e, value) => {
                                  setFieldValue(fieldName, value)
                                  debounceSubmit(e)
                                }}
                              />
                            )}
                          </Field>
                        </Grid>
                      )
                    })}
                    <Grid item xs>
                      <ScoringSlider
                        color={groupOverall ? 'primary' : null}
                        label="Overall"
                        value={groupOverall}
                      />
                    </Grid>
                  </Grid>
                )
              })}
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

AssessmentPillarScoring.propTypes = {
  theme: T.object.isRequired,
  assessmentId: T.number.isRequired,
  assessmentData: T.object.isRequired,
  pillar: T.object.isRequired,
  criterion: T.object.isRequired,
  partNumber: T.number.isRequired,
  onScoreSaved: T.func.isRequired,
}

export default withTheme()(AssessmentPillarScoring)
