import React, { useEffect } from 'react'
import { Grid, Button, Typography, withStyles } from '@material-ui/core'
import { PaddedContainer, SectionTitle } from 'components'
import { Link } from 'gatsby'
import { useManualQuery } from 'graphql-hooks'
import { Redirect } from '@reach/router'

import SEO from '../components/SEO'
import { getAssessmentPartData } from '../queries'
import { getUserTokenData } from '../utils/auth'
import AssessmentScoringHeader from '../components/AssessmentScoringHeader'
import AssessmentPillarScoring from '../components/AssessmentPillarScoring'
import { getAssessmentId } from '../utils/url'
import FileList from '../components/FileList'
import CriterionPartTable from '../components/CriterionPartTable'
import CriterionPartPagination from '../components/CriterionPartPagination'
import CriterionPartFeedbackTable from '../components/CriterionPartFeedbackTable'
import AssessmentPillars from '../components/AssessmentPillars'
import {
  assessmentInProgress,
  assessmentSubmitted,
} from '../utils/assessment-status'

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
    pillarColors,
    previousLink,
    nextLink,
    totalParts,
    criteriaList,
  },
}) {
  if (!getUserTokenData().loggedIn) {
    return <Redirect to="/auth" noThrow />
  }

  // Get most specific available definition or default from loaded JSON
  const columnsDef = criterion.columns || pillar.columns || assessment.columns
  const feedbackTablesDef =
    part.feedbackTables ||
    criterion.feedbackTables ||
    pillar.feedbackTables ||
    assessment.feedbackTables
  const scoringDef = pillar.scoring || assessment.scoring
  const scoringRules = pillar.scoringRules || assessment.scoringRules || {}

  const assessmentId = getAssessmentId(location)
  const userTokenData = getUserTokenData()

  const [
    fetchAssessmentPartData,
    {
      loading,
      error,
      data: { assessment_by_pk: assessmentData } = { assessment_by_pk: null },
    },
  ] = useManualQuery(getAssessmentPartData, {
    variables: {
      id: assessmentId,
      pillarKey: pillar.key,
      criterionKey: criterion.key,
      partNumber,
    },
  })

  useEffect(() => {
    if (!assessmentData) {
      fetchAssessmentPartData()
    }
  }, [fetchAssessmentPartData, assessmentData])

  if (error) {
    return 'Error'
  }

  if (loading || !assessmentData) {
    return 'Loading...'
  }

  const canEditTablesAndUpload =
    (userTokenData.admin || userTokenData.contributor) &&
    assessmentInProgress(assessmentData)
  const canEditFeedbackAndScoring =
    userTokenData.assessor && assessmentSubmitted(assessmentData)

  return (
    <div className={classes.root} data-testid="criterion-part">
      <SEO title={criterion.name} />
      <PaddedContainer className={classes.paddedContainer}>
        <Grid container spacing={2} wrap="nowrap">
          <Grid item>
            <Button
              className={classes.backButton}
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
              userId={userTokenData.userId}
              pillar={pillar}
              criterion={criterion}
              partNumber={partNumber}
              files={assessmentData.files}
              canUpload={canEditTablesAndUpload}
              onUploadComplete={fetchAssessmentPartData}
            />
          </Grid>
        </Grid>
        <div className={classes.section}>
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <SectionTitle barColor={pillarColor}>
                <Link to={`/assessment/${assessment.key}#${assessmentId}`}>
                  {pillar.name}
                </Link>{' '}
                <span style={{ color: pillarColor }}>▶</span>{' '}
                <Link
                  to={`/assessment/${assessment.key}/${pillar.key}/${criterion.key}#${assessmentId}`}
                >
                  {criterion.name}
                </Link>
              </SectionTitle>
            </Grid>
          </Grid>
        </div>
        {part.tables.map((table, tableIndex) => (
          <CriterionPartTable
            tableDef={table}
            columnsDef={table.columns || columnsDef}
            key={table.key}
            assessmentTables={assessmentData.tables}
            assessmentId={assessmentId}
            criterionKey={criterion.key}
            pillarKey={pillar.key}
            partNumber={partNumber}
            canEdit={canEditTablesAndUpload}
            criteriaList={criteriaList}
            paginationNode={
              tableIndex === 0 && (
                <CriterionPartPagination
                  assessmentId={assessmentId}
                  link={Link}
                  nextLink={nextLink}
                  previousLink={previousLink}
                  partNumber={partNumber}
                  totalParts={totalParts}
                />
              )
            }
          />
        ))}
        <div className={classes.section}>
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <SectionTitle barColor={pillarColor}>
                To be completed by assessors
              </SectionTitle>
            </Grid>
          </Grid>
        </div>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="h2" color="primary" gutterBottom>
              Capture Strength, Areas for Improvement and Good Practices
            </Typography>
          </Grid>
        </Grid>
        {feedbackTablesDef.map(tableDef => (
          <CriterionPartFeedbackTable
            tableDef={tableDef}
            key={tableDef.key}
            assessmentFeedbackTables={assessmentData.feedbackTables}
            assessmentId={assessmentId}
            criterionKey={criterion.key}
            pillarKey={pillar.key}
            partNumber={partNumber}
            canEdit={canEditFeedbackAndScoring}
          />
        ))}
        <div className={classes.section}>
          <CriterionPartPagination
            assessmentId={assessmentId}
            link={Link}
            nextLink={nextLink}
            previousLink={previousLink}
            partNumber={partNumber}
            totalParts={totalParts}
          />
        </div>
        <AssessmentPillars
          assessment={assessment}
          assessmentData={assessmentData}
          pillarColors={pillarColors}
        />
      </PaddedContainer>
      <div className={classes.scoringSection}>
        <PaddedContainer>
          <AssessmentScoringHeader />
          <AssessmentPillarScoring
            assessmentId={assessmentId}
            assessment={assessment}
            assessmentData={assessmentData}
            pillar={pillar}
            scoringDef={scoringDef}
            scoringRules={scoringRules}
            criterion={criterion}
            partNumber={partNumber}
            canEdit={canEditFeedbackAndScoring}
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
  backButton: {
    paddingLeft: 0,
  },
  section: {
    margin: theme.spacing(3, 0),
  },
  scoringSection: {
    backgroundColor: theme.palette.background.light,
    padding: theme.spacing(3, 0),

    // Work around MUI 3.x sliders bug causing viewport overflow
    // see https://github.com/mui-org/material-ui/issues/13455
    overflow: 'hidden',
  },
})

export default withStyles(styles, { withTheme: true })(CriterionPartTemplate)
