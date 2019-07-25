import React from 'react'
import { Grid, Button, Typography, withStyles } from '@material-ui/core'
import { PaddedContainer, SectionTitle } from 'components'
import { Link } from 'gatsby'
import { useQuery } from 'graphql-hooks'
import { Redirect } from '@reach/router'

import SEO from '../components/SEO'
import { getAssessmentPartData } from '../queries'
import {
  isAuthenticatedSync,
  getUserIdSync,
  isAdminSync,
  isContributorSync,
  isAssessorSync,
} from '../utils/auth'
import AssessmentPillarScoring from '../components/AssessmentPillarScoring'
import { getAssessmentId } from '../utils/url'
import FileList from '../components/FileList'
import CriterionPartTable from '../components/CriterionPartTable'
import CriterionPartPagination from '../components/CriterionPartPagination'
import CriterionPartFeedbackTable from '../components/CriterionPartFeedbackTable'
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
    previousLink,
    nextLink,
    totalParts,
    criteriaList,
  },
}) {
  if (!isAuthenticatedSync()) {
    return <Redirect to="/auth" noThrow />
  }

  const assessmentId = getAssessmentId(location)
  const userId = getUserIdSync()
  const isAdmin = isAdminSync()
  const isContributor = isContributorSync()
  const isAssessor = isAssessorSync()

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

  const canEditTablesAndUpload =
    (isAdmin || isContributor) && assessmentInProgress(assessmentData)
  const canEditFeedbackAndScoring =
    isAssessor && assessmentSubmitted(assessmentData)

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
              userId={userId}
              pillar={pillar}
              criterion={criterion}
              partNumber={partNumber}
              files={assessmentData.files}
              canUpload={canEditTablesAndUpload}
              onUploadComplete={refetch}
            />
          </Grid>
        </Grid>
        <div className={classes.section}>
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <SectionTitle barColor={pillarColor}>
                {pillar.name} <span style={{ color: pillarColor }}>▶</span>{' '}
                {criterion.name}
              </SectionTitle>
            </Grid>
          </Grid>
        </div>
        {part.tables.map((table, tableIndex) => (
          <CriterionPartTable
            tableDef={table}
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
                Criteria Assessment
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
        {part.feedbackTables.map(tableDef => (
          <CriterionPartFeedbackTable
            tableDef={tableDef}
            key={tableDef.key}
            assessmentFeedbackTables={assessmentData.feedbackTables}
            assessmentId={assessmentId}
            criterionKey={criterion.key}
            pillarKey={pillar.key}
            partNumber={partNumber}
            canEdit={canEditTablesAndUpload}
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