import React, { useRef } from 'react'
import debounce from 'lodash/debounce'
import { useMutation } from 'graphql-hooks'
import { withTheme, Grid } from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { ScoringSlider } from 'components'
import T from 'prop-types'

import {
  insertAssessmentScoringDataMutation,
  updateAssessmentScoringDataMutation,
} from '../queries'

function createScoringInitialValues(assessmentPart, assessmentData) {
  const existingScoringData = getExistingScoringData(
    assessmentData.assessment[0]
  )

  if (existingScoringData) {
    return existingScoringData.scoring_values
  }

  return assessmentPart.scoring.reduce(
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

function AssessmentPartScoring({
  theme,
  assessmentData,
  assessmentPart,
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

  return (
    <Formik
      onSubmit={handleScoreChange}
      initialValues={createScoringInitialValues(assessmentPart, assessmentData)}
    >
      {({ setFieldValue, handleSubmit }) => {
        submitRef.current = handleSubmit

        return (
          <Form>
            <Grid container direction="column" spacing={theme.spacing.unit * 2}>
              {assessmentPart.scoring.map(scoringGroup => (
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
                              step={5}
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
                    <ScoringSlider label="Overall" value={0} />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

AssessmentPartScoring.propTypes = {
  theme: T.object.isRequired,
  assessmentData: T.object.isRequired,
  assessmentPart: T.object.isRequired,
  pillar: T.object.isRequired,
  criterion: T.object.isRequired,
  partNumber: T.number.isRequired,
  createNewAssessment: T.func.isRequired,
  onScoreSaved: T.func.isRequired,
}

export default withTheme()(AssessmentPartScoring)
