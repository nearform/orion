import React from 'react'
import classnames from 'classnames'
import mean from 'lodash/mean'
import round from 'lodash/round'
import get from 'lodash/get'
import { withStyles, Grid, Typography } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'
import { useTranslation } from 'react-i18next'
import { Formik, Form, Field } from 'formik'
import { ScoringSlider } from 'components'
import T from 'prop-types'

import ContextualHelp from './ContextualHelp'
import ScoringWrapper from './ScoringWrapper'

function AssessmentPillarScoring(props) {
  const { t } = useTranslation()
  const { classes, canEdit } = props
  return (
    <ScoringWrapper {...props}>
      {({
        SLIDER_STEP,
        getOverallValue,
        submitRef,
        handleScoreChange,
        getCapDescription,
        scoringValues,
        scoringRules,
        scoringDef,
      }) => {
        const maxCols = scoringDef.reduce(
          (maxCols, { scores: { length } }) => Math.max(maxCols, length),
          0
        )

        const colWidth = 12 / maxCols

        const hasCap = !!scoringRules.capBy

        return (
          <Formik
            onSubmit={handleScoreChange}
            initialValues={scoringValues}
            // validation disabled because triggered manually below
            validateOnChange={false}
            validateOnBlur={false}
            // re-initialize if the initialValues change due to the watch
            enableReinitialize
          >
            {({ setFieldValue, submitForm, values, validateForm }) => {
              const submitOnLastAction = async key => {
                // MUI currently has inconsistent onChange / onChangeCommitted order between
                // click and drag actions until release for
                // https://github.com/mui-org/material-ui/pull/14475
                submitRef.current[key] = true
                if (
                  submitRef.current.onChange &&
                  submitRef.current.onChangeCommitted
                ) {
                  // Prevent timing bugs - by default, Formik validates in a promise on a
                  // setState callback so without explicit validation here, submitForm()
                  // can fail if validation hasn't completed
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
                  <Grid container direction="column" spacing={2}>
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
                        <Grid
                          key={scoringGroup.key}
                          item
                          container
                          spacing={2}
                          xs={12}
                          alignItems="flex-end"
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="h3"
                              className={classes.scoringHeader}
                            >
                              {scoringGroup.name}
                            </Typography>
                          </Grid>
                          {scoringGroup.scores.map(score => {
                            const fieldName = `${scoringGroup.key}.${score.key}`

                            return (
                              <Grid item key={score.key} xs={colWidth}>
                                {score.description && (
                                  <ContextualHelp
                                    helpContent={score.description}
                                    className={classes.helpIcon}
                                  >
                                    <HelpIcon color="secondary" />
                                  </ContextualHelp>
                                )}
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
                                      onChangeCommitted={() => {
                                        submitOnLastAction('onChangeCommitted')
                                      }}
                                    />
                                  )}
                                </Field>
                              </Grid>
                            )
                          })}
                        </Grid>
                      )
                    })}
                    <Grid item xs={12}>
                      <Typography variant="h3">{t('Overall')}</Typography>
                    </Grid>
                    <Grid item xs={colWidth} className={classes.overall}>
                      {hasCap && getOverallValue(groupOverall, cap) > cap && (
                        <ContextualHelp
                          helpContent={`
                      The overall score has been capped by the score for
                      ${getCapDescription(scoringRules.capBy, scoringDef)},
                      reducing it from ${getOverallValue(groupOverall, cap)}
                      to ${cap}.
                    `}
                          className={classnames(
                            classes.helpIcon,
                            classes.overallHelpIcon
                          )}
                        >
                          <HelpIcon color="primary" />
                        </ContextualHelp>
                      )}
                      <ScoringSlider
                        disabled={!canEdit}
                        color={'primary'}
                        value={Math.min(
                          getOverallValue(groupOverall, cap),
                          cap
                        )}
                      />
                    </Grid>
                  </Grid>
                </Form>
              )
            }}
          </Formik>
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
    height: theme.spacing(2.5),
  },
}))(AssessmentPillarScoring)
