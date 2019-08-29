import React, { useRef, useState } from 'react'
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

function getScoringData(assessmentData, scoringDef) {
  const { id, scoring_values: values } = assessmentData.scoring[0] || {}

  // Get any previously saved data that is in latest def, ignore data dropped from def, set new def keys to 0
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
    scoringId: id,
    scoringValues,
  }
}

function AssessmentPillarScoring({
  theme,
  assessmentId,
  assessmentData,
  pillar,
  scoringDef,
  criterion,
  partNumber,
  canEdit,
}) {
  const { scoringId, scoringValues } = getScoringData(
    assessmentData,
    scoringDef
  )

  const [currentScoringId, setCurrentScoringId] = useState(scoringId)
  const [insertScoringData] = useMutation(insertAssessmentScoringDataMutation)
  const [updateScoringData] = useMutation(updateAssessmentScoringDataMutation)

  const submitRef = useRef({
    onChange: false,
    onDragEnd: false,
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

  return (
    <Formik
      onSubmit={handleScoreChange}
      initialValues={scoringValues}
      // validation disabled because triggered manually below
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ setFieldValue, submitForm, values, validateForm }) => {
        const submitOnLastAction = async key => {
          // MUI currently has inconsistent onChange / onDragEnd order between click and drag
          // actions until release for https://github.com/mui-org/material-ui/pull/14475
          submitRef.current[key] = true
          if (submitRef.current.onChange && submitRef.current.onDragEnd) {
            // Prevent timing bugs - by default, Formik validates in a promise on a setState callback
            // so without explicit validation here, submitForm() can fail if validation hasn't completed
            await validateForm()
            submitForm()
            submitRef.current.onChange = false
            submitRef.current.onDragEnd = false
          }
        }

        return (
          <Form>
            <Grid container direction="column" spacing={2}>
              {scoringDef.map(scoringGroup => {
                const existingScores = values[scoringGroup.key]

                const groupOverall = !existingScores
                  ? 0
                  : round(
                      mean(Object.values(values[scoringGroup.key])) /
                        SLIDER_STEP
                    ) * SLIDER_STEP

                return (
                  <Grid key={scoringGroup.key} item container spacing={4}>
                    {scoringGroup.scores.map(score => {
                      const fieldName = `${scoringGroup.key}.${score.key}`

                      return (
                        <Grid item key={score.key} xs>
                          <Field name={fieldName}>
                            {({ field }) => (
                              <ScoringSlider
                                {...field}
                                disabled={!canEdit}
                                color={field.value ? 'secondary' : null}
                                step={SLIDER_STEP}
                                label={score.name}
                                onChange={(e, value) => {
                                  setFieldValue(fieldName, value)
                                  submitOnLastAction('onChange')
                                }}
                                onDragEnd={() => {
                                  submitOnLastAction('onDragEnd')
                                }}
                              />
                            )}
                          </Field>
                        </Grid>
                      )
                    })}
                    <Grid item xs>
                      <ScoringSlider
                        disabled={!canEdit}
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
  scoringDef: T.array.isRequired,
  criterion: T.object.isRequired,
  partNumber: T.number.isRequired,
  canEdit: T.bool.isRequired,
}

export default withTheme(AssessmentPillarScoring)
