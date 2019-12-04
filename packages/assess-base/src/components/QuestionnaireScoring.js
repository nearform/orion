import React, { useRef, useState } from 'react'
import classnames from 'classnames'
import mean from 'lodash/mean'
import round from 'lodash/round'
import get from 'lodash/get'
import { useMutation } from 'graphql-hooks'
import { withStyles, Grid, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Formik, Form, Field } from 'formik'
import { ScoringSlider, SectionTitle } from 'components'
import T from 'prop-types'
import AssessmentScoringHeader from './AssessmentScoringHeader'

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
  classes,
  assessmentId,
  assessmentData,
  pillar,
  scoringDef,
  scoringRules,
  criterion,
  partNumber,
  canEdit,
  pillarColor,
}) {
  const { t } = useTranslation()
  const { scoringId, scoringValues } = getScoringData(
    assessmentData,
    scoringDef
  )

  const [currentScoringId, setCurrentScoringId] = useState(scoringId)
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

  return (
    <Grid container>
      <Grid xs={6}>
        <SectionTitle barColor={pillarColor}>
          {t('In practice, we find that an outstanding organisation:')}
        </SectionTitle>
      </Grid>
      <Grid xs={3}></Grid>
      <Grid xs={3} className={classes.scoringSection}>
        <div className={classes.scoringHeader}>
          <AssessmentScoringHeader />
        </div>
      </Grid>
      <Grid xs={12}>
        <Formik
          onSubmit={handleScoreChange}
          initialValues={scoringValues}
          // validation disabled because triggered manually below
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ setFieldValue, submitForm, values, validateForm }) => {
            const submitOnLastAction = async key => {
              // MUI currently has inconsistent onChange / onChangeCommitted order between click and drag
              // actions until release for https://github.com/mui-org/material-ui/pull/14475
              submitRef.current[key] = true
              if (
                submitRef.current.onChange &&
                submitRef.current.onChangeCommitted
              ) {
                // Prevent timing bugs - by default, Formik validates in a promise on a setState callback
                // so without explicit validation here, submitForm() can fail if validation hasn't completed
                await validateForm()
                submitForm()
                submitRef.current.onChange = false
                submitRef.current.onChangeCommitted = false
              }
            }

            const groupOverall = []
            const cap = get(values, scoringRules.capBy, 100)

            return (
              <Form>
                <Grid container>
                  {scoringDef.map(scoringGroup => {
                    const existingScores = values[scoringGroup.key]

                    const groupScore = !existingScores
                      ? 0
                      : round(
                          mean(Object.values(values[scoringGroup.key])) /
                            SLIDER_STEP
                        ) * SLIDER_STEP
                    groupOverall.push(groupScore)
                    return (
                      <Grid key={scoringGroup.key} item container xs={12}>
                        {scoringGroup.scores.map(score => {
                          const fieldName = `${scoringGroup.key}.${score.key}`

                          return (
                            <Grid item key={score.key} xs={12}>
                              <Field name={fieldName}>
                                {({ field }) => (
                                  <Grid container>
                                    <Grid
                                      item
                                      xs={9}
                                      className={classes.questionGrid}
                                    >
                                      <Typography
                                        variant="h2"
                                        className={classes.question}
                                      >
                                        {Math.random() > 0.5
                                          ? score.description
                                          : `Researches and understands the ecosystem, including Megatrends, and the consequences on it of the United Nations Sustainable Development Goals and Global Compact ambitions and analyses different scenarios, current and future capabilities and market-place dynamics.`}
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={3}
                                      className={classnames(
                                        classes.scoringSection,
                                        classes.sliderGrid
                                      )}
                                    >
                                      <div className={classes.sliders}>
                                        <ScoringSlider
                                          {...field}
                                          disabled={!canEdit}
                                          color={
                                            field.value ? 'secondary' : null
                                          }
                                          step={SLIDER_STEP}
                                          // label={score.name}
                                          onChange={(e, value) => {
                                            setFieldValue(fieldName, value)
                                            submitOnLastAction('onChange')
                                          }}
                                          onChangeCommitted={() => {
                                            submitOnLastAction(
                                              'onChangeCommitted'
                                            )
                                          }}
                                        />
                                      </div>
                                    </Grid>
                                  </Grid>
                                )}
                              </Field>
                            </Grid>
                          )
                        })}
                      </Grid>
                    )
                  })}
                  <Grid item container>
                    <Grid item xs={9} className={classes.questionGrid}>
                      <Typography variant="h2" className={classes.question}>
                        {t('Overall')}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      className={classnames(
                        classes.scoringSection,
                        classes.sliderGrid
                      )}
                    >
                      <div className={classes.sliders}>
                        <ScoringSlider
                          disabled={!canEdit}
                          color={'primary'}
                          value={Math.min(
                            getOverallValue(groupOverall, cap),
                            cap
                          )}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            )
          }}
        </Formik>
      </Grid>
    </Grid>
  )
}

AssessmentPillarScoring.propTypes = {
  assessmentId: T.number.isRequired,
  assessmentData: T.object.isRequired,
  pillar: T.object.isRequired,
  scoringDef: T.array.isRequired,
  criterion: T.object.isRequired,
  partNumber: T.number.isRequired,
  canEdit: T.bool.isRequired,
}

export default withStyles(theme => ({
  helpIcon: {
    position: 'relative',
    left: `calc(100% - ${theme.spacing(4)}px)`,
    top: theme.spacing(0.5),
    zIndex: 10,
  },
  overallHelpIcon: {
    position: 'absolute',
    top: theme.spacing(-2.5),
    left: 'auto',
    right: theme.spacing(2.5),
  },
  overall: {
    position: 'relative',
  },
  scoringHeader: {
    marginLeft: theme.spacing(1.75),
  },
  scoringSection: {
    backgroundColor: theme.palette.background.light,
  },
  sliderGrid: {
    padding: theme.spacing(3, 0),
    borderBottom: '2px solid white',
  },
  questionGrid: {
    borderBottom: `2px solid ${theme.palette.background.light}`,
    display: 'flex',
    alignItems: 'center',
  },
  question: {
    color: theme.palette.primary.main,
  },
  sliders: {
    marginLeft: theme.spacing(4),
  },
}))(AssessmentPillarScoring)
