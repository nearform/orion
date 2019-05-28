import React from 'react'
import { Grid, Button, Typography, withStyles } from '@material-ui/core'
import { PaddedContainer } from 'components'
import { Link } from 'gatsby'
import { useQuery } from 'graphql-hooks'
import { Redirect } from '@reach/router'

import SEO from '../components/seo'
import SectionTitle from '../components/SectionTitle'
import { getAssessmentPartData } from '../queries'
import { isAuthenticatedSync, getUserIdSync } from '../utils/auth'
import AssessmentPillarScoring from '../components/AssessmentPillarScoring'
import { getAssessmentId } from '../utils/url'
import FileList from '../components/FileList'
import CriterionPartTable from '../components/CriterionPartTable'

function CriterionPartTemplate({
  theme,
  classes,
  location,
  pageContext: {
    partNumber,
    part,
    pillar,
    criterion,
    assessment,
    pillarColor,
    previousLink,
    nextLink,
    totalParts,
  },
}) {
  if (!isAuthenticatedSync()) {
    return <Redirect to="/auth" noThrow />
  }

  const assessmentId = getAssessmentId(location)
  const userId = getUserIdSync()

  const {
    loading,
    error,
    data: { assessment_by_pk: assessmentData } = { assessment_by_pk: null },
    refetch,
  } = useQuery(getAssessmentPartData, {
    variables: {
      id: assessmentId,
      pillarKey: pillar.key,
      criterionKey: criterion.key,
      partNumber,
    },
  })

  if (loading) {
    return 'Loading...'
  }

  if (error) {
    return 'Error'
  }

  return (
    <div className={classes.root} data-testid="criterion-part">
      <SEO title={criterion.name} />
      <PaddedContainer className={classes.paddedContainer}>
        <Grid container spacing={theme.spacing.unit * 2} wrap="nowrap">
          <Grid item>
            <Button
              component={Link}
              to={`assessment/${assessment.key}#${assessmentId}`}
              variant="text"
              color="secondary"
            >
              ◀ Assessment overview
            </Button>
          </Grid>
          <Grid item xs />
          <Grid item>
            <FileList
              assessmentId={assessmentId}
              userId={userId}
              pillar={pillar}
              criterion={criterion}
              partNumber={partNumber}
              files={assessmentData.files}
              onUploadComplete={refetch}
            />
          </Grid>
        </Grid>
        <div className={classes.section}>
          <Grid container spacing={theme.spacing.unit * 4}>
            <Grid item>
              <SectionTitle barColor={pillarColor}>
                {pillar.name} <span style={{ color: pillarColor }}>▶</span>{' '}
                {criterion.name}
              </SectionTitle>
            </Grid>
          </Grid>
        </div>
        <div className={classes.section}>
          <Grid container spacing={theme.spacing.unit * 2} justify="flex-end">
            <Grid item>
              {previousLink ? (
                <Typography
                  color="secondary"
                  component={Link}
                  to={`${previousLink}#${assessmentId}`}
                  variant="body1"
                >
                  ❮
                </Typography>
              ) : (
                <Typography variant="body1" color="textSecondary">
                  ❮
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Typography variant="body1">
                PART {partNumber} OF {totalParts}
              </Typography>
            </Grid>
            <Grid item>
              {nextLink ? (
                <Typography
                  variant="body1"
                  color="secondary"
                  component={Link}
                  to={`${nextLink}#${assessmentId}`}
                >
                  ❯
                </Typography>
              ) : (
                <Typography variant="body1" color="textSecondary">
                  ❯
                </Typography>
              )}
            </Grid>
          </Grid>
        </div>
        {part.tables.map(table => (
          <CriterionPartTable
            table={table}
            key={table.key}
            assessmentTables={assessmentData.tables}
            assessmentId={assessmentId}
            criterionKey={criterion.key}
            pillarKey={pillar.key}
            partNumber={partNumber}
          />
        ))}
      </PaddedContainer>
      <div className={classes.scoringSection}>
        <PaddedContainer>
          <Typography variant="h2" color="primary" gutterBottom>
            Scoring Section
          </Typography>
          <AssessmentPillarScoring
            assessmentId={assessmentId}
            assessment={assessment}
            assessmentData={assessmentData}
            pillar={pillar}
            criterion={criterion}
            partNumber={partNumber}
          />
        </PaddedContainer>
      </div>
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
    margin: `${theme.spacing.unit * 3}px 0`,
  },
  scoringSection: {
    backgroundColor: theme.palette.background.light,
    padding: `${theme.spacing.unit * 3}px 0`,

    // Work around MUI 3.x sliders bug causing viewport overflow
    // see https://github.com/mui-org/material-ui/issues/13455
    overflow: 'hidden',
  },
})

export default withStyles(styles, { withTheme: true })(CriterionPartTemplate)
