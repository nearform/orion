import React, { useContext } from 'react'
import { Grid, Button, Typography, withStyles } from '@material-ui/core'
import {
  AuthContext,
  useAuthorizedQuery,
  PaddedContainer,
  SectionTitle,
} from 'components'
import { Link } from 'gatsby'
import { Redirect } from '@reach/router'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'

import { getAssessmentPartData } from '../queries'
import QuestionnaireScoring from '../components/QuestionnaireScoring'
import { getAssessmentId } from '../utils/url'
import QuestionnaireBackgroundInfo from '../components/QuestionnaireBackgroundInfo'
import AssessmentPillars from '../components/AssessmentPillars'
import SEO from '../components/SEO'
import { assessmentInProgress } from '../utils/assessment-status'
import { filterOldScores } from '../utils/filter-old-scores'
import { getAssessmentParts } from 'efqm-theme/assessments/getAssessmentParts'

function QuestionnaireScoringTemplate({
  theme,
  classes,
  location,
  pageContext: {
    partNumber,
    part: contextPart,
    pillar: contextPillar,
    criterion: contextCriterion,
    assessment: contextAssessment,
    pillarColor,
    pillarColors,
    criteriaList,
  },
}) {
  const { isAuthInitialized, getUserTokenData } = useContext(AuthContext)
  const { isAuthenticated } = getUserTokenData()
  const { t, i18n } = useTranslation()
  const lang = i18n.language || 'en'
  const { assessment, pillar, criterion, part } = getAssessmentParts(
    contextAssessment.key,
    lang,
    contextPillar,
    contextCriterion,
    contextPart
  )

  const table = part.tables[0]

  // Get most specific available definition or default from loaded JSON
  const columnsDef = criterion.columns || pillar.columns || assessment.columns
  const scoringDef = criterion.scoring || pillar.scoring || assessment.scoring
  const scoringRules = pillar.scoringRules || assessment.scoringRules || {}

  const assessmentId = getAssessmentId(location)
  const { isContributor } = getUserTokenData()

  const { loading, error, data: assessmentData } = useAuthorizedQuery(
    getAssessmentPartData,
    {
      id: assessmentId,
      pillarKey: pillar.key,
      criterionKey: criterion.key,
      partNumber: partNumber || 1,
    },
    {
      onPreFetch: variables => !!variables.id,
      onFetch: data => filterOldScores(assessment, data.assessment_by_pk),
    }
  )

  if (isAuthInitialized && !isAuthenticated) {
    return <Redirect to="/auth" noThrow />
  }

  if (error) {
    return t('Error')
  }

  if (loading || !assessmentData) {
    return (
      <div className={classes.root} data-testid="criterion-part">
        <PaddedContainer className={classes.paddedContainer}>
          <Grid container spacing={2} wrap="nowrap">
            <Grid item>
              <Typography variant="h3">{t('Loading...')}</Typography>
            </Grid>
          </Grid>
        </PaddedContainer>
      </div>
    )
  }

  // TODO: when doing permission story fix here
  const canEdit = isContributor && assessmentInProgress(assessmentData)
  // const canEditTablesAndUpload =
  //   isContributor && assessmentInProgress(assessmentData)
  // const canEditFeedbackAndScoring =
  //   isAssessor && assessmentSubmitted(assessmentData)

  return (
    <div className={classes.root} data-testid="criterion-part">
      <SEO title={criterion.name} />
      <PaddedContainer className={classes.paddedContainer}>
        <Grid container spacing={2} wrap="nowrap">
          <Grid item>
            <Button
              className={classes.backButton}
              component={Link}
              to={`/assessment/${assessment.key}#${assessmentId}`}
              variant="text"
              color="secondary"
            >
              ◀ {t('Assessment overview')}
            </Button>
          </Grid>
          <Grid item xs />
        </Grid>
        <div className={classes.section}>
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <SectionTitle barColor={pillarColor}>
                <Link to={`/assessment/${assessment.key}#${assessmentId}`}>
                  {pillar.name}
                </Link>
                <span style={{ color: pillarColor }}>▶</span>
                <Link
                  to={`/assessment/${assessment.key}/${pillar.key}/${criterion.key}#${assessmentId}`}
                >
                  {criterion.name}
                </Link>
              </SectionTitle>
            </Grid>
            <Grid item xs={9}>
              <Typography component="div">
                <ReactMarkdown
                  className={classes.description}
                  source={criterion.description}
                />
              </Typography>
            </Grid>
          </Grid>
        </div>
        <QuestionnaireScoring
          assessmentId={assessmentId}
          assessment={assessment}
          assessmentData={assessmentData}
          pillar={pillar}
          scoringDef={scoringDef}
          scoringRules={scoringRules}
          criterion={criterion}
          partNumber={partNumber}
          canEdit={canEdit}
          pillarColor={pillarColor}
        />
        <QuestionnaireBackgroundInfo
          tableDef={table}
          columnsDef={table.columns || columnsDef}
          key={table.key}
          assessmentTables={assessmentData.tables}
          assessmentId={assessmentId}
          criterionKey={criterion.key}
          pillarKey={pillar.key}
          partNumber={partNumber}
          canEdit={canEdit}
          pillarColor={pillarColor}
        />
        <AssessmentPillars
          assessment={assessment}
          assessmentData={assessmentData}
          pillarColors={pillarColors}
        />
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
  backButton: {
    paddingLeft: 0,
  },
  section: {
    margin: theme.spacing(3, 0),
  },
  description: {
    fontSize: theme.spacing(2),
    '& p:first-of-type': {
      marginTop: '-6px',
    },
    '& ul': {
      listStyle: 'none',
      '& li::before': {
        content: '"\\2022"',
        color: theme.palette.tertiary.main,
        fontWeight: 'bold',
        display: 'inline-block',
        width: '1em',
        marginLeft: '-1em',
        opacity: '0.5',
      },
    },
  },
  scoringSection: {
    backgroundColor: theme.palette.background.light,
    padding: theme.spacing(3, 0),

    // Work around MUI 3.x sliders bug causing viewport overflow
    // see https://github.com/mui-org/material-ui/issues/13455
    overflow: 'hidden',
  },
  '@global': {
    footer: {
      display: 'none',
    },
  },
})

export default withStyles(styles, { withTheme: true })(
  QuestionnaireScoringTemplate
)
