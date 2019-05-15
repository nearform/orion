import React, { useRef } from 'react'
import debounce from 'lodash/debounce'
import { useMutation } from 'graphql-hooks'
import { withTheme, Grid } from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { ScoringSlider } from 'components'
import T from 'prop-types'
import mean from 'lodash/mean'
import round from 'lodash/round'

import {
  insertAssessmentScoringDataMutation,
  updateAssessmentScoringDataMutation,
} from '../queries'

const SLIDER_STEP = 5

function createScoringInitialValues(pillar, assessmentData) {
  const existingScoringData = getExistingScoringData(
    assessmentData.assessment[0]
  )

  if (existingScoringData) {
    return existingScoringData.scoring_values
  }

  return pillar.scoring.reduce(
    (acc, scoringGroup) => ({
      ...acc,
      [scoringGroup.key]: scoringGroup.scores.reduce(
        (acc, score) => ({ ...acc, [score.key]: 0 }),
        {}
      ),
    }),
    {}
  )
}

function getExistingScoringData(assessment) {
  return assessment && assessment.scoring[0]
}

const SAVE_SCORE_DEBOUNCE_TIME = 1000

function AssessmentPillarScoring({
  theme,
  assessmentData,
  pillar,
  criterion,
  partNumber,
  onScoreSaved,
  createNewAssessment,
}) {
  const [insertScoringData] = useMutation(insertAssessmentScoringDataMutation)
  const [updateScoringData] = useMutation(updateAssessmentScoringDataMutation)

  const submitRef = useRef()

  const debounceSubmit = debounce(
    e => submitRef.current(e),
    SAVE_SCORE_DEBOUNCE_TIME
  )

  async function handleScoreChange(values) {
    try {
      const assessmentId = assessmentData.assessment.length
        ? assessmentData.assessment[0].id
        : await createNewAssessment()

      const scoringData = getExistingScoringData(assessmentData.assessment[0])

      if (scoringData) {
        await updateScoringData({
          variables: {
            id: scoringData.id,
            scoringValues: values,
          },
        })
      } else {
        await insertScoringData({
          variables: {
            assessmentId,
            pillarKey: pillar.key,
            criterionKey: criterion.key,
            partNumber,
            scoringValues: values,
          },
        })
      }
    } finally {
      onScoreSaved()
    }
  }

  const scoringValues = createScoringInitialValues(pillar, assessmentData)

  return (
    <Formik onSubmit={handleScoreChange} initialValues={scoringValues}>
      {({ setFieldValue, handleSubmit }) => {
        submitRef.current = handleSubmit

        return (
          <Form>
            <Grid container direction="column" spacing={theme.spacing.unit * 2}>
              {pillar.scoring.map(scoringGroup => {
                const groupOverall =
                  round(
                    mean(Object.values(scoringValues[scoringGroup.key])) /
                      SLIDER_STEP
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
  assessmentData: T.object.isRequired,
  pillar: T.object.isRequired,
  criterion: T.object.isRequired,
  partNumber: T.number.isRequired,
  createNewAssessment: T.func.isRequired,
  onScoreSaved: T.func.isRequired,
}

export default withTheme()(AssessmentPillarScoring)
