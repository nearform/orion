import React, { useContext, useEffect } from 'react'
import { navigate } from '@reach/router'
import {
  withStyles,
  Grid,
  Button,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import {
  ASSESSMENT_STATUS,
  AuthContext,
  getChartData,
  BarChartTable,
  ConfirmDialog,
  PaddedContainer,
  SectionTitle,
} from 'components'
import { Link } from 'gatsby'
import ChevronRightIcon from '@material-ui/icons/ChevronRightRounded'
import { useMutation, useManualQuery } from 'graphql-hooks'
import get from 'lodash/get'

import FeedbackReportInput from '../components/FeedbackReportInput'
import SEO from '../components/SEO'
import { getAssessmentId } from '../utils/url'
import { filterOldScores } from '../utils/filter-old-scores'

import {
  getAssessmentFeedbackReportData,
  updateAssessmentPillarSummaryMutation,
  updateAssessmentAdviceMutation,
  updateAssessmentStatusMutation,
} from '../queries'

function sortByPart(obj, key) {
  if (!obj[key]) return null

  return obj[key]
    .sort((a, b) => a.part_number - b.part_number)
    .reduce(
      (acc, item) => [
        ...acc,
        ...item.feedback_values.map(value => ({
          value: value[key],
          link: `${item.pillar_key}/${item.criterion_key}/${item.part_number}`,
        })),
      ],
      []
    )
}

function FeedbackReport({
  theme,
  classes,
  pageContext: { assessment, pillarColors },
  location,
}) {
  const assessmentId = getAssessmentId(location)
  const [updateAssessmentStatus] = useMutation(updateAssessmentStatusMutation)

  const { getUserTokenData } = useContext(AuthContext)
  const { isAdmin, isAssessor } = getUserTokenData()
  const { t } = useTranslation()

  const [fetchAssessmentFeedbackReportData, { data }] = useManualQuery(
    getAssessmentFeedbackReportData,
    {
      variables: {
        assessmentId,
      },
    }
  )

  const assessmentData = get(data, 'assessment_by_pk')

  filterOldScores(assessment, assessmentData)

  useEffect(() => {
    if (!assessmentData) {
      fetchAssessmentFeedbackReportData()
    }
  }, [fetchAssessmentFeedbackReportData, assessmentData])

  const handleSubmitFeedbackReport = async () => {
    await updateAssessmentStatus({
      variables: {
        id: assessmentId,
        status: ASSESSMENT_STATUS.closed,
      },
    })

    navigate('/')
  }

  // TODO: Check that this is correct
  const canEditSummaryAndAdvice = isAdmin || isAssessor

  const chartData = getChartData(assessment, assessmentData, pillarColors)

  const assessmentName = get(assessmentData, 'name', t('Loading...'))

  return (
    <div className={classes.root}>
      <SEO title={assessment.name} />
      <PaddedContainer className={classes.paddedContainer}>
        <Button
          component={Link}
          to={`assessment/${assessment.key}#${assessmentId}`}
          variant="text"
          color="secondary"
        >
          ◀ {t('Assessment overview')}
        </Button>
        <div className={classes.section}>
          <Grid container>
            <Grid item>
              <Typography variant="h4" gutterBottom>
                {t('feedback report')}
              </Typography>
              <Typography variant="h2" color="primary">
                {assessmentName}
              </Typography>
            </Grid>
            <Grid item xs />
            <Grid item>
              <ConfirmDialog
                disabled={!assessmentData}
                onConfirm={handleSubmitFeedbackReport}
                title={t(`Submit report for`) + ` “${assessmentName}”?`}
                text={t(
                  `The feedback report for this assessment will be finalised. No more edits or scoring will be possible. This cannot be undone.`
                )}
              >
                <Button color="secondary" variant="contained">
                  {t('Submit Feedback Report')}
                </Button>
              </ConfirmDialog>
            </Grid>
          </Grid>
        </div>
        <div className={classes.section}>
          <Grid container spacing={5}>
            <Grid item xs={3}>
              <SectionTitle barColor={theme.palette.primary.dark} gutterBottom>
                {t(`Assessment scoring summary`)}
              </SectionTitle>
              <Typography>
                {t(
                  `Mouse over the criteria bar on the chart to see the sub-criteria scoring.`
                )}
              </Typography>
            </Grid>
            <Grid item xs>
              {assessmentData && (
                <BarChartTable
                  chartData={chartData}
                  assessmentId={assessmentId}
                />
              )}
            </Grid>
          </Grid>
        </div>
        <div className={classes.section}>
          <Grid container spacing={4} direction="column">
            {assessmentData &&
              assessment.pillars.map((pillarDef, pillarIndex) => {
                return (
                  <>
                    <Grid item xs={12}>
                      {assessmentData && (
                        <FeedbackReportInput
                          label={pillarDef.name}
                          name="pillar_summary"
                          key={pillarDef.key}
                          assessmentId={assessmentId}
                          initialValue={
                            assessmentData.pillar_summary !== null
                              ? assessmentData.pillar_summary
                              : {}
                          }
                          mutation={updateAssessmentPillarSummaryMutation}
                          canEdit={canEditSummaryAndAdvice}
                          pillarColor={pillarColors[pillarIndex]}
                          rows={7}
                        />
                      )}
                    </Grid>
                    {pillarDef.criteria.map(criterionDef => {
                      const feedbackByTableKey = assessmentData.feedbackTables.reduce(
                        (acc, table) => {
                          if (
                            table.criterion_key === criterionDef.key &&
                            table.pillar_key === pillarDef.key
                          ) {
                            acc[table.table_key] = (
                              acc[table.table_key] || []
                            ).concat(table)
                          }
                          return acc
                        },
                        {}
                      )

                      const feedbackAreas = [
                        [
                          'Strength',
                          sortByPart(feedbackByTableKey, 'strengths'),
                        ],
                        [
                          'Areas of improvement',
                          sortByPart(
                            feedbackByTableKey,
                            'areas-of-improvement'
                          ),
                        ],
                        [
                          'Good practice',
                          sortByPart(feedbackByTableKey, 'good-practice'),
                        ],
                      ]

                      return (
                        <Grid
                          key={criterionDef.key}
                          item
                          container
                          spacing={2}
                          direction="column"
                        >
                          <Grid item xs={4}>
                            <SectionTitle barColor={pillarColors[pillarIndex]}>
                              <Link
                                to={`/assessment/${assessmentData.key}/${pillarDef.key}/${criterionDef.key}/1/#${assessmentId}`}
                              >
                                {t(criterionDef.name)}
                              </Link>
                            </SectionTitle>
                          </Grid>
                          {feedbackAreas.map(area => {
                            const [label, feedbackItems] = area
                            if (!feedbackItems) return null

                            const key = `${pillarDef.key}-${criterionDef.key}-${label}`
                            return (
                              <Grid item xs key={key}>
                                <Paper>
                                  <Table size="small">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>{t(label)}</TableCell>
                                        <TableCell align="right" />
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {feedbackItems.map((feedbackItem, i) => (
                                        <TableRow key={`${key}-${i}`}>
                                          <TableCell>
                                            {feedbackItem.value}
                                          </TableCell>
                                          <TableCell align="right">
                                            <Link
                                              to={`/assessment/${assessmentData.key}/${feedbackItem.link}/#${assessmentId}`}
                                            >
                                              <IconButton>
                                                <ChevronRightIcon />
                                              </IconButton>
                                            </Link>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </Paper>
                              </Grid>
                            )
                          })}
                        </Grid>
                      )
                    })}
                  </>
                )
              })}
          </Grid>
        </div>
        <div className={classes.section}>
          {assessmentData && (
            <FeedbackReportInput
              label={t('Advice for Company')}
              name="advice"
              assessmentId={assessmentId}
              initialValue={assessmentData.advice || ''}
              mutation={updateAssessmentAdviceMutation}
              canEdit={canEditSummaryAndAdvice}
              rows={6}
            />
          )}
        </div>
      </PaddedContainer>
    </div>
  )
}

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  paddedContainer: {
    flex: 1,
  },
  section: {
    marginTop: theme.spacing(3),
  },
})

export default withStyles(styles, { withTheme: true })(FeedbackReport)
