import React from 'react'
import { withStyles, Typography, Grid } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Link } from 'gatsby'
import { BarChart, SectionTitle, getChartData } from 'components'

const AssessmentPillars = ({
  theme,
  classes,
  assessment,
  assessmentData,
  pillarColors,
}) => {
  if (!assessmentData) return null
  const { t } = useTranslation()
  const chartData = getChartData(assessment, assessmentData, pillarColors)
  return (
    <div className={classes.section} data-testid="assessment__model-areas">
      <Grid container spacing={3}>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            {t(
              'To navigate within the assessment please click on an area of the model'
            )}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {assessment.pillars.map((pillar, pillarIndex) => {
          const pillarColor = pillarColors[pillarIndex]
          return (
            <Grid
              key={pillar.name}
              item
              xs
              container
              spacing={3}
              direction="column"
            >
              <Grid item>
                <SectionTitle barColor={pillarColor}>
                  {pillar.name}
                </SectionTitle>
              </Grid>
              {pillar.criteria.map(criterion => (
                <Grid item key={criterion.name}>
                  <Typography
                    component={assessmentData.id ? Link : null}
                    to={
                      assessmentData.id
                        ? `/assessment/${assessment.key}/${pillar.key}/${criterion.key}#${assessmentData.id}`
                        : null
                    }
                    variant="h3"
                    display="block"
                    gutterBottom
                    style={{ color: pillarColor }}
                  >
                    {criterion.name}
                  </Typography>
                  {assessment.matrixType !== 'basic' && (
                    <Typography
                      variant="h4"
                      className={classes.sectionProgress}
                    >
                      {criterion.parts.length} {t('Subcriteria')}
                    </Typography>
                  )}
                </Grid>
              ))}{' '}
            </Grid>
          )
        })}
        {assessment.pillars.length > 0 && (
          <Grid
            key="scoring-summary"
            item
            xs
            container
            spacing={3}
            direction="column"
          >
            <Grid item xs>
              <SectionTitle barColor={theme.palette.primary.dark} gutterBottom>
                {t('Scoring Summary')}
              </SectionTitle>
              <BarChart chartData={chartData} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  )
}

const styles = theme => ({
  section: {
    margin: theme.spacing(3, 0),
  },
  sectionProgress: {
    color: theme.palette.primary.dark,
  },
})

export default withStyles(styles, { withTheme: true })(AssessmentPillars)
