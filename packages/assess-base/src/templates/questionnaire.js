import React, { useContext, useEffect, useState } from 'react'
import { Typography, withStyles, Grid, Button, Box } from '@material-ui/core'
import { Link, navigate } from 'gatsby'
import { Formik, Form, Field } from 'formik'
import { TextField as FormikTextField } from 'formik-material-ui'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'graphql-hooks'
import HelpIcon from '@material-ui/icons/Help'
import get from 'lodash/get'
import * as Yup from 'yup'
import { getAssessmentParts } from 'efqm-theme/assessments/getAssessmentParts'

import {
  AuthContext,
  useAuthorizedQuery,
  PaddedContainer,
  ASSESSMENT_STATUS,
  ConfirmDialog,
  SectionTitle,
  TypedChip,
} from 'components'
import {
  createAssessmentMutation,
  getShallowAssessmentData,
  updateAssessmentStatusMutation,
  getAssessmentContributorsAssessorsData,
} from '../queries'
import { getAssessmentId } from '../utils/url'
import ContextualHelp from '../components/ContextualHelp'
import ContentModal from '../components/ContentModal'
import SEO from '../components/SEO'
import AssessmentPillars from '../components/AssessmentPillars'
import { ReportLinks } from '../components/report-links'
import { Redirect } from '@reach/router'
import { assessmentInProgress } from '../utils/assessment-status'
import {
  getCanEditAssesors,
  getCanEditContributors,
} from '../utils/permission-checks'
import { filterOldScores } from '../utils/filter-old-scores'

const assessmentValidationSchema = Yup.object().shape({
  name: Yup.string().required(),
})

function QuestionnaireTemplate({
  location,
  theme,
  classes,
  pageContext: { assessment: contextAssessment, pillarColors },
}) {
  const [modalProps, setModalProps] = useState({
    mdContent: '',
    open: false,
    subTitle: '',
    title: '',
    width: '',
  })
  const { t, i18n } = useTranslation()
  const lang = i18n.language || 'en'
  const { assessment } = getAssessmentParts(contextAssessment.key, lang)

  const assessmentId = getAssessmentId(location)
  // Use an effect hook to test if page has an assessment ID; this is done
  // to avoid problems with SSR and hydration. Value defaults to 'true' for
  // better page loading experience.
  const [hasAssessmentId, setHasAssessmentId] = useState(true)
  useEffect(() => setHasAssessmentId(!!assessmentId), [assessmentId])

  const { isAuthInitialized, getUserTokenData, getUserAuth } = useContext(
    AuthContext
  )
  const { isAdmin, userId, groupId } = getUserTokenData()

  const {
    data: assessmentData,
    refetch: refetchAssessmentData,
  } = useAuthorizedQuery(
    getShallowAssessmentData,
    { id: assessmentId },
    {
      onPreFetch: variables => !!variables.id,
      onFetch: data => filterOldScores(assessment, data.assessment_by_pk),
    }
  )

  const { data: assessorsData } = useAuthorizedQuery(
    getAssessmentContributorsAssessorsData,
    { assessmentId },
    { onPreFetch: variables => !!variables.assessmentId }
  )

  const [createAssessment] = useMutation(createAssessmentMutation)
  const [updateAssessmentStatus] = useMutation(updateAssessmentStatusMutation)

  if (!assessmentId && (isAuthInitialized && !isAdmin)) {
    return <Redirect to="/auth" noThrow />
  }

  function loadAssessment(id) {
    refetchAssessmentData({ id })
  }

  async function handleCreateAssessment({ name }) {
    const { data } = await createAssessment({
      variables: {
        key: assessment.key,
        name,
        owner_id: userId,
        internal: false,
      },
    })
    const id = get(data, 'insert_assessment.returning.0.id')

    navigate(`${location.pathname}#${id}`)
  }

  async function handleSubmitAssessment() {
    await updateAssessmentStatus({
      variables: {
        id: assessmentId,
        status: ASSESSMENT_STATUS.submitted,
      },
    })

    loadAssessment(assessmentId)
  }

  const canSubmit = isAdmin && assessmentInProgress(assessmentData)

  const canCreateAssessment = isAdmin

  const canAssignContributorsAndAssessors = getUserAuth('platform-admin')
    ? true
    : (isAdmin && getCanEditAssesors(groupId, assessmentData)) ||
      getCanEditContributors(groupId, assessmentData)

  const assessmentName = get(assessmentData, 'name', 'Loading...')

  const assessors = get(assessorsData, 'assessors', [])
  const contributors = get(assessorsData, 'contributors', [])

  const headers = [
    { id: 'id', label: 'ID' },
    { id: 'email', label: 'Email' },
    { id: 'group', label: 'Group' },
  ]
  if (canAssignContributorsAndAssessors) {
    headers.push({ id: 'contributor', label: 'Contributor' })
    headers.push({ id: 'assessor', label: 'Assessor' })
  }

  return (
    <>
      <ContentModal
        onClose={() => {
          setModalProps({ ...modalProps, open: false })
        }}
        {...modalProps}
      />
      <SEO title={get(assessmentData, 'name', 'Assessment')} />
      <PaddedContainer data-testid="assessment">
        <Button component={Link} to="/" variant="text" color="secondary">
          ◀ {t('Assess base home')}
        </Button>
        <div
          className={classes.section}
          data-testid="assessment__key-information"
        >
          <Grid container spacing={4} className={classes.topGrid}>
            <Grid
              item
              xs={9}
              container
              direction="column"
              wrap="nowrap"
              spacing={4}
            >
              <Grid item container>
                <Grid item xs={4}>
                  <SectionTitle
                    barColor={theme.palette.secondary.main}
                    className={classes.sectionTitle}
                    gutterBottom
                  >
                    {assessment.name}
                    {assessment.guidance && (
                      <ContextualHelp helpContent={assessment.guidance}>
                        <HelpIcon
                          color="secondary"
                          className={classes.helpIcon}
                        />
                      </ContextualHelp>
                    )}
                  </SectionTitle>
                </Grid>
                <Grid item xs />
                <Grid item>
                  {canSubmit && (
                    <ConfirmDialog
                      disabled={!assessmentData}
                      onConfirm={handleSubmitAssessment}
                      type="submit"
                      title={t('Submit Assessment Filename', {
                        fileName: assessmentName,
                      })}
                      text={
                        <>
                          <p>
                            {t(
                              'This assessment will be submitted to the assessors for scoring and evaluation. Contributors will no longer be able to edit the assessment content.'
                            )}
                          </p>
                          <p>{t('This cannot be undone.')}</p>
                        </>
                      }
                    >
                      <Button color="secondary" variant="contained">
                        {t('Submit Assessment')}
                      </Button>
                    </ConfirmDialog>
                  )}
                </Grid>
              </Grid>
              <Grid item xs>
                <Grid
                  className={!hasAssessmentId ? classes.displayNone : null}
                  container
                  direction="column"
                  spacing={1}
                >
                  <Grid item xs>
                    <Typography variant="h2" color="primary">
                      {assessmentName}
                    </Typography>
                  </Grid>
                </Grid>
                <Formik
                  enableReinitialize
                  initialValues={{
                    name: '',
                  }}
                  validationSchema={assessmentValidationSchema}
                  onSubmit={handleCreateAssessment}
                >
                  {({ isValid }) => (
                    <Form>
                      <Grid
                        container
                        spacing={2}
                        className={hasAssessmentId ? classes.displayNone : null}
                      >
                        <Grid item xs>
                          <Grid container direction="column" spacing={1}>
                            <Grid item>
                              <Typography variant="h4">
                                {t('Enter your questionnaire name')}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Field
                                name="name"
                                component={FormikTextField}
                                fullWidth
                                FormHelperTextProps={{
                                  classes: { root: classes.displayNone },
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs>
                          <Grid container direction="column" spacing={1}>
                            <Grid item>
                              <Typography variant="h4">&nbsp;</Typography>
                            </Grid>
                            <Grid item>
                              <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                                disabled={!isValid || !canCreateAssessment}
                              >
                                {t('Create Questionnaire')}
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Grid>
              {canAssignContributorsAndAssessors && (
                <Grid
                  container
                  className={!hasAssessmentId ? classes.displayNone : null}
                >
                  <Grid item xs={12} className={classes.participants}>
                    {assessors.map(({ assessor }) =>
                      assessor ? (
                        <TypedChip
                          key={assessor.id}
                          name={`${assessor.first_name} ${assessor.last_name}`}
                          type="Assessor"
                          color="primary"
                        />
                      ) : null
                    )}
                    {contributors.map(({ contributor }) =>
                      contributor ? (
                        <TypedChip
                          key={contributor.id}
                          name={`${contributor.first_name} ${contributor.last_name}`}
                          type="Contributor"
                          color="secondary"
                        />
                      ) : null
                    )}
                  </Grid>
                  <Grid item xs>
                    <Button
                      variant="outlined"
                      color="secondary"
                      component={Link}
                      to={`/assessment/${assessment.key}/contributors-assessors#${assessmentId}`}
                    >
                      {t('Assign Contributors and Assessors')}
                    </Button>
                  </Grid>
                </Grid>
              )}
              <Grid item xs={9}>
                <Typography variant="body2">
                  {assessment.shortDescription}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={3}
              container
              className={classes.filesSeparator}
              direction="column"
            >
              <Box className={classes.sideBar}>
                <ReportLinks
                  assessment={assessmentData}
                  canViewFeedbackReport={true}
                  canViewManagementReport={false}
                />
              </Box>
            </Grid>
          </Grid>
        </div>
        <AssessmentPillars
          assessment={assessment}
          assessmentData={assessmentData}
          pillarColors={pillarColors}
        />
      </PaddedContainer>
    </>
  )
}

const styles = theme => ({
  section: {
    margin: theme.spacing(3, 0),
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  helpIcon: {
    marginLeft: theme.spacing(1),
  },
  keyInformationInput: {
    marginBottom: theme.spacing(2),
  },
  sectionProgress: {
    color: theme.palette.primary.dark,
  },
  sideBar: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: theme.spacing(3),
    },
    '& > *:last-child': {
      marginBottom: 0,
    },
    width: '100%',
  },
  filesSeparator: {
    borderLeft: `solid 1px ${theme.palette.background.light}`,
  },
  topGrid: {
    marginBottom: theme.spacing(18),
  },
  buttonBar: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  displayNone: {
    display: 'none',
  },
  switch: {
    // Align switch with adjacent button
    marginTop: theme.spacing(0.75),
  },
  participants: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginRight: -theme.spacing(1),
    '& > *': {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
  },
})

export default withStyles(styles, { withTheme: true })(QuestionnaireTemplate)
