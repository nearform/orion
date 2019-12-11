import React from 'react'
import { withStyles, Grid, Button, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { getAssessmentParts } from 'efqm-theme/assessments/getAssessmentParts'
import {
  useAuthorizedQuery,
  getChartData,
  BarChartTable,
  PaddedContainer,
  SectionTitle,
} from 'components'
import { Link } from 'gatsby'
import get from 'lodash/get'

import SEO from '../components/SEO'
import { getAssessmentId } from '../utils/url'
import { filterOldScores } from '../utils/filter-old-scores'
import { getAssessmentFeedbackReportData } from '../queries'

function QuestionnaireFeedbackReport({
  theme,
  classes,
  pageContext: { assessment: contextAssessment, pillarColors },
  location,
}) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const { assessment } = getAssessmentParts(contextAssessment.key, lang)
  const assessmentId = getAssessmentId(location)

  const { data: assessmentData } = useAuthorizedQuery(
    getAssessmentFeedbackReportData,
    { assessmentId },
    {
      onPreFetch: variables => !!variables.assessmentId,
      onFetch: data => filterOldScores(assessment, data.assessment_by_pk),
    }
  )

  const chartData = getChartData(assessment, assessmentData, pillarColors)
  const assessmentName = get(assessmentData, 'name', t('Loading...'))

  return (
    <div className={classes.root}>
      <SEO title={assessment.name} />
      <PaddedContainer className={classes.paddedContainer}>
        <Button
          component={Link}
          to={`/assessment/${assessment.key}#${assessmentId}`}
          variant="text"
          color="secondary"
        >
          ◀ {t('Assessment overview')}
        </Button>
        <div className={classes.section}>
          <Typography variant="h4" gutterBottom>
            {t('feedback report')}
          </Typography>
          <Typography variant="h2" color="primary">
            {assessmentName}
          </Typography>
        </div>
        <div className={classes.section}>
          <Grid container spacing={5}>
            <Grid item xs={3}>
              <SectionTitle barColor={theme.palette.primary.dark} gutterBottom>
                {t(`Questionnaire scoring summary`)}
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
          <Grid
            container
            spacing={4}
            direction="column"
            className={classes.rationaleContainer}
          >
            {assessmentData &&
              assessment.pillars.map((pillarDef, pillarIndex) => {
                return (
                  <React.Fragment key={pillarDef.key}>
                    {pillarDef.criteria.map(criterionDef => {
                      const table = assessmentData.tables.find(
                        table => table.criterion_key === criterionDef.key
                      )
                      if (!table) return null
                      const rationale = get(
                        table,
                        'table_values[0].background-info'
                      )
                      if (!rationale) return null

                      return (
                        <Grid key={criterionDef.key} item container spacing={2}>
                          <Grid item xs={3}>
                            <SectionTitle barColor={pillarColors[pillarIndex]}>
                              <Link
                                to={`/assessment/${assessmentData.key}/${pillarDef.key}/${criterionDef.key}/1/#${assessmentId}`}
                              >
                                {criterionDef.name}
                              </Link>
                            </SectionTitle>
                          </Grid>
                          <Grid item xs={9}>
                            <Typography
                              variant="h4"
                              className={classes.rationaleHeader}
                            >
                              {t('rationale')}
                            </Typography>
                            <Typography variant="body2">{rationale}</Typography>
                          </Grid>
                        </Grid>
                      )
                    })}
                  </React.Fragment>
                )
              })}
          </Grid>
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
  rationaleContainer: {
    marginBottom: theme.spacing(4),
  },
  rationaleHeader: {
    marginBottom: theme.spacing(0.5),
    marginTop: theme.spacing(-0.25),
  },
})

export default withStyles(styles, { withTheme: true })(
  QuestionnaireFeedbackReport
)
