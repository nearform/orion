import React from 'react'
import classnames from 'classnames'
import mean from 'lodash/mean'
import round from 'lodash/round'
import get from 'lodash/get'
import { withStyles, Grid, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Formik, Form, Field } from 'formik'
import { ScoringSlider, SectionTitle } from 'components'
import T from 'prop-types'

import AssessmentScoringHeader from './AssessmentScoringHeader'
import ScoringWrapper from './ScoringWrapper'

function AssessmentPillarScoring(props) {
  const { t } = useTranslation()
  const { classes, pillarColor, canEdit } = props

  return (
    <ScoringWrapper {...props}>
      {({
        SLIDER_STEP,
        getOverallValue,
        submitRef,
        handleScoreChange,
        scoringValues,
        scoringRules,
        scoringDef,
      }) => {
        return (
          <Grid container>
            <Grid item xs={6}>
              <SectionTitle barColor={pillarColor}>
                {t('In practice, we find that an outstanding organisation:')}
              </SectionTitle>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid
              item
              xs={3}
              className={classnames(
                classes.scoringSection,
                classes.scoringGuide
              )}
            >
              <div className={classes.scoringHeader}>
                <AssessmentScoringHeader isQuestionnaire={true} />
              </div>
            </Grid>
            <Grid item xs={12}>
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
                                              {score.description}
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
                                                  field.value
                                                    ? 'secondary'
                                                    : null
                                                }
                                                step={SLIDER_STEP}
                                                onChange={(e, value) => {
                                                  setFieldValue(
                                                    fieldName,
                                                    value
                                                  )
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
                            <Typography
                              variant="h2"
                              className={classes.question}
                            >
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
      }}
    </ScoringWrapper>
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
  pillarColor: T.string,
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
  scoringGuide: {
    marginBottom: '-40px',
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
