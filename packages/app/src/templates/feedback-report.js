import React from 'react'
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
import { PaddedContainer, BarChartTable } from 'components'
import { Link } from 'gatsby'
import ChevronRightIcon from '@material-ui/icons/ChevronRightRounded'
import { useQuery } from 'graphql-hooks'
import get from 'lodash/get'

import SEO from '../components/SEO'
import SectionTitle from '../components/SectionTitle'
import FeedbackReportInput from '../components/FeedbackReportInput'
import { getAssessmentId } from '../utils/url'
import { isAdminSync, isAssessorSync } from '../utils/auth'
import {
  getAssessmentFeedbackReportData,
  updateAssessmentExecSummaryMutation,
  updateAssessmentAdviceMutation,
} from '../queries'
import {
  getSampleColors,
  getSampleData,
} from 'components/src/components/BarChart/util.storybook'

function sortByPart(obj, key) {
  if (!obj[key]) return null

  return obj[key]
    .sort((a, b) => a.part_number - b.part_number)
    .reduce(
      (acc, item) => [...acc, ...item.feedback_values.map(value => value[key])],
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

  const {
    data: { assessment_by_pk: assessmentData } = { assessment_by_pk: null },
  } = useQuery(getAssessmentFeedbackReportData, {
    variables: {
      assessmentId,
    },
  })

  const isAdmin = isAdminSync()
  const isAssessor = isAssessorSync()

  // TODO: Check that this is correct
  const canEditSummaryAndAdvice = isAdmin || isAssessor

  const sampleColors = getSampleColors(theme)
  const chartData = getSampleData(sampleColors)

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
          ◀ Assessment overview
        </Button>
        <div className={classes.section}>
          <Grid container>
            <Grid item>
              <Typography variant="h4" gutterBottom>
                feedback report
              </Typography>
              <Typography variant="h2" color="primary">
                {get(assessmentData, 'name', 'Loading...')}
              </Typography>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Button color="secondary" variant="contained">
                Submit Feedback Report
              </Button>
            </Grid>
          </Grid>
        </div>
        <div className={classes.section}>
          {assessmentData && (
            <FeedbackReportInput
              label="Executive summary"
              name="exec_summary"
              assessmentId={assessmentId}
              initialValue={assessmentData.exec_summary}
              mutation={updateAssessmentExecSummaryMutation}
              canEdit={canEditSummaryAndAdvice}
              rows={10}
            />
          )}
        </div>
        <div className={classes.section}>
          <Grid container spacing={5}>
            <Grid item xs={3}>
              <SectionTitle barColor={theme.palette.primary.dark} gutterBottom>
                Assessment scoring summary
              </SectionTitle>
              <Typography>
                Mouse over the criteria bar on the chart to see the sub-criteria
                scoring.
              </Typography>
            </Grid>
            <Grid item xs>
              <BarChartTable chartData={chartData} />
            </Grid>
          </Grid>
        </div>
        <div className={classes.section}>
          <Grid container spacing={4} direction="column">
            {assessmentData &&
              assessment.pillars.map((pillarDef, pillarIndex) =>
                pillarDef.criteria.map(criterionDef => {
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
                    ['Strength', sortByPart(feedbackByTableKey, 'strengths')],
                    [
                      'Areas of improvement',
                      sortByPart(feedbackByTableKey, 'areas-of-improvement'),
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
                          {criterionDef.name}
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
                                    <TableCell>{label}</TableCell>
                                    <TableCell align="right" />
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {feedbackItems.map((feedbackValue, i) => (
                                    <TableRow key={`${key}-${i}`}>
                                      <TableCell>{feedbackValue}</TableCell>
                                      <TableCell align="right">
                                        <IconButton>
                                          <ChevronRightIcon />
                                        </IconButton>
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
                })
              )}
          </Grid>
        </div>
        <div className={classes.section}>
          {assessmentData && (
            <FeedbackReportInput
              label="Advice for Company"
              name="advice"
              assessmentId={assessmentId}
              initialValue={assessmentData.advice}
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
