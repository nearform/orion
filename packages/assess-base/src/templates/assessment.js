import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Typography, withStyles, Grid, Button, Box } from '@material-ui/core'
import { Link, navigate } from 'gatsby'
import { Formik, Form, Field } from 'formik'
import {
  TextField as FormikTextField,
  Switch as FormikSwitch,
} from 'formik-material-ui'
import { useTranslation } from 'react-i18next'
import { useMutation, useManualQuery } from 'graphql-hooks'
import HelpIcon from '@material-ui/icons/Help'
import get from 'lodash/get'
import * as Yup from 'yup'
import matrixData from 'efqm-theme/assessments'

import {
  AuthContext,
  PaddedContainer,
  ASSESSMENT_STATUS,
  ConfirmDialog,
  SectionTitle,
  TypedChip,
} from 'components'
import {
  createAssessmentMutation,
  getShallowAssessmentData,
  createFileUploadMutation,
  updateAssessmentKeyInfoMutation,
  updateAssessmentStatusMutation,
  getAssessmentContributorsAssessorsData,
} from '../queries'
import { getAssessmentId } from '../utils/url'
import { uploadFile } from '../utils/storage'
import ContextualHelp from '../components/ContextualHelp'
import ContentModal from '../components/ContentModal'
import SEO from '../components/SEO'
import UploadButton from '../components/UploadButton'
import AssessmentPillars from '../components/AssessmentPillars'
import KeyInfoDocsList from '../components/key-info-docs-list'
import { ReportLinks } from '../components/report-links'
import { Redirect } from '@reach/router'
import {
  assessmentInProgress,
  assessmentSubmitted,
} from '../utils/assessment-status'
import {
  getCanEditAssesors,
  getCanEditContributors,
} from '../utils/permission-checks'

function createFormInitialValues(assessmentKeyInfoDef, assessmentData) {
  return assessmentKeyInfoDef.reduce(
    (fields, { key }) => ({
      ...fields,
      [key]:
        assessmentData && assessmentData.key_information
          ? assessmentData.key_information[key]
          : '',
    }),
    {}
  )
}

const assessmentValidationSchema = Yup.object().shape({
  name: Yup.string().required(),
  internal: Yup.boolean().required(),
})

function AssessmentTemplate({
  location,
  theme,
  classes,
  pageContext: { assessment, pillarColors },
}) {
  const [modalProps, setModalProps] = useState({
    mdContent: '',
    open: false,
    subTitle: '',
    title: '',
    width: '',
  })
  const assessmentId = getAssessmentId(location)
  const { getUserTokenData, getUserAuth } = useContext(AuthContext)
  const { isAdmin, isContributor, userId, groupId } = getUserTokenData()

  if (!assessmentId && !isAdmin) {
    return <Redirect to="/auth" noThrow />
  }

  const [assessmentData, setAssessmentData] = useState()
  const [createAssessment] = useMutation(createAssessmentMutation)
  const [updateAssessmentKeyInfo] = useMutation(updateAssessmentKeyInfoMutation)
  const [getAssessment] = useManualQuery(getShallowAssessmentData)
  const [createFileUpload] = useMutation(createFileUploadMutation)
  const [updateAssessmentStatus] = useMutation(updateAssessmentStatusMutation)

  useEffect(() => {
    if (assessmentId && !assessmentData) {
      loadAssessment(assessmentId)
    }
  }, [assessmentId, assessmentData])

  async function handleCreateAssessment({ name, internal }) {
    const { data } = await createAssessment({
      variables: {
        key: assessment.key,
        name,
        internal,
        owner_id: userId,
      },
    })
    const id = get(data, 'insert_assessment.returning.0.id')

    navigate(`${location.pathname}#${id}`)
  }

  async function loadAssessment(id) {
    const {
      data: { assessment_by_pk: assessmentData } = {},
    } = await getAssessment({ variables: { id } })

    setAssessmentData(assessmentData)
  }

  async function handleUpdateKeyInfo(values) {
    const { error } = await updateAssessmentKeyInfo({
      variables: {
        id: assessmentId,
        keyInfo: values,
      },
    })

    if (error) throw error
    await loadAssessment(assessmentId)
  }

  async function createNewFileUpload(assessmentId, file, s3Key) {
    const { data, error } = await createFileUpload({
      variables: {
        fileUploadData: {
          user_id: userId,
          assessment_id: assessmentId,
          file_name: file.name,
          file_size: file.size,
          s3_key: s3Key,
        },
      },
    })

    if (error) throw error

    return data.insert_assessment_file.returning[0].id
  }

  async function handleFileUpload(file) {
    const { key: s3Key } = await uploadFile(file, assessmentId)
    await createNewFileUpload(assessmentId, file, s3Key)
    await loadAssessment(assessmentId)
  }

  async function handleFileDelete(file) {
    await loadAssessment(assessmentId)
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

  const canEditKeyInformationAndUpload =
    isContributor && assessmentInProgress(assessmentData)

  const canSubmit = isAdmin && assessmentInProgress(assessmentData)

  const canCreateAssessment = isAdmin

  // TODO: change this with correct rule based on assessment state
  const canViewFeedbackReport = assessmentSubmitted(assessmentData)

  const canAssignContributorsAndAssessors = getUserAuth('platform-admin')
    ? true
    : (isAdmin && getCanEditAssesors(groupId, assessmentData)) ||
      getCanEditContributors(groupId, assessmentData)

  const assessmentName = get(assessmentData, 'name', 'Loading...')
  const { t } = useTranslation()

  function _placeholderEtoN(email) {
    return email
      .split('@')[0]
      .split('.')
      .map(n => n.charAt(0).toUpperCase() + n.slice(1))
      .join(' ')
  }

  const [fetchShallowAssessmentData, { data: assessmentByPk }] = useManualQuery(
    getShallowAssessmentData,
    {
      variables: {
        id: assessmentId,
      },
    }
  )

  const [fetchAssessmentContributorsAssessorsData, { data }] = useManualQuery(
    getAssessmentContributorsAssessorsData,
    {
      variables: { assessmentId },
    }
  )
  useEffect(() => {
    if (!assessmentByPk) {
      fetchShallowAssessmentData()
    }
    if (!data) {
      fetchAssessmentContributorsAssessorsData()
    }
  }, [
    fetchShallowAssessmentData,
    assessmentByPk,
    fetchAssessmentContributorsAssessorsData,
    data,
  ])

  const assessors = get(data, 'assessors', [])
  const contributors = get(data, 'contributors', [])

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
          <Grid container spacing={4}>
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
                    barColor={theme.palette.primary.dark}
                    className={classes.sectionTitle}
                    gutterBottom
                  >
                    {t(assessment.name)}
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
                      title={`Submit assessment “${assessmentName}”?`}
                      text={
                        <>
                          <p>
                            This assessment will be submitted to the assessors
                            for scoring and evaluation. Contributors will no
                            longer be able to edit the assessment content.
                          </p>
                          <p>This cannot be undone.</p>
                        </>
                      }
                    >
                      <Button color="secondary" variant="contained">
                        Submit Assessment
                      </Button>
                    </ConfirmDialog>
                  )}
                </Grid>
              </Grid>
              <Grid item xs>
                {assessmentId ? (
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="h4">
                        {get(assessmentData, 'internal')
                          ? t('internal assessment name')
                          : t('external assessment name')}
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h2" color="primary">
                        {assessmentName}
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <Formik
                    enableReinitialize
                    initialValues={{
                      name: '',
                      internal: true,
                    }}
                    validationSchema={assessmentValidationSchema}
                    onSubmit={handleCreateAssessment}
                  >
                    {({ isValid }) => (
                      <Form>
                        <Grid container spacing={2}>
                          <Grid item xs>
                            <Grid container direction="column" spacing={1}>
                              <Grid item>
                                <Typography variant="h4">
                                  Enter your assessment name
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
                          <Grid item>
                            <Grid container direction="column" spacing={0}>
                              <Grid item>
                                <Typography variant="h4">Internal</Typography>
                              </Grid>
                              <Grid item>
                                <Field
                                  name="internal"
                                  className={classes.switch}
                                  component={FormikSwitch}
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
                                  Create Assessment
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                )}
              </Grid>
              {canAssignContributorsAndAssessors && (
                <Grid container>
                  <Grid item xs={12} className={classes.participants}>
                    {assessors.map(({ assessor }) =>
                      assessor ? (
                        <TypedChip
                          key={assessor.id}
                          name={_placeholderEtoN(assessor.email)}
                          type="Assessor"
                          color="primary"
                        />
                      ) : null
                    )}
                    {contributors.map(({ contributor }) =>
                      contributor ? (
                        <TypedChip
                          key={contributor.id}
                          name={_placeholderEtoN(contributor.email)}
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
                      to={`assessment/${assessment.key}/contributors-assessors#${assessmentId}`}
                    >
                      {t('Assign Contributors and Assessors')}
                    </Button>
                  </Grid>
                </Grid>
              )}
              <Grid item xs>
                <Typography
                  variant="h3"
                  className={classes.keyInformationHeader}
                >
                  key information
                  {assessment.keyInformation.guidance && (
                    <ContextualHelp
                      helpContent={assessment.keyInformation.guidance}
                    >
                      <HelpIcon
                        color="secondary"
                        className={classes.helpIcon}
                      />
                    </ContextualHelp>
                  )}
                </Typography>
                <Formik
                  enableReinitialize
                  initialValues={createFormInitialValues(
                    assessment.keyInformation.keyInformationItems,
                    assessmentData
                  )}
                  onSubmit={handleUpdateKeyInfo}
                >
                  {({ dirty }) => (
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item container spacing={2}>
                          {assessment.keyInformation.keyInformationItems.map(
                            (keyInfo, index) => (
                              <Fragment key={keyInfo.key}>
                                <Grid item xs={6}>
                                  <Box
                                    className={
                                      classes.keyInformationSectionHeadingWrapper
                                    }
                                  >
                                    <Typography
                                      className={
                                        classes.keyInformationSectionHeading
                                      }
                                      variant="h4"
                                      gutterBottom
                                    >
                                      {keyInfo.name}
                                    </Typography>
                                    <Typography
                                      className={
                                        classes.keyInformationSectionHeadingMoreInfo
                                      }
                                      onClick={() => {
                                        setModalProps({
                                          mdContent: matrixData[2][keyInfo.key],
                                          open: true,
                                          subTitle: keyInfo.name,
                                          title: 'Key Information',
                                          width: '500px',
                                        })
                                      }}
                                    >
                                      More Info
                                    </Typography>
                                  </Box>
                                  <Field
                                    name={keyInfo.key}
                                    component={FormikTextField}
                                    fullWidth
                                    multiline
                                    rows={5}
                                    disabled={
                                      !assessmentId ||
                                      !canEditKeyInformationAndUpload
                                    }
                                  />
                                </Grid>
                                {index === 0 && <Grid item xs={6} />}
                              </Fragment>
                            )
                          )}
                        </Grid>
                        {canEditKeyInformationAndUpload && (
                          <Grid item container spacing={2} justify="flex-end">
                            <Grid item>
                              <UploadButton
                                onFileSelected={handleFileUpload}
                                color="secondary"
                                variant="outlined"
                              >
                                upload key information
                              </UploadButton>
                            </Grid>
                            <Grid item>
                              <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                                disabled={!assessmentId || !dirty}
                              >
                                Save Updates
                              </Button>
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                    </Form>
                  )}
                </Formik>
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
                  canViewFeedbackReport={canViewFeedbackReport}
                />
                <KeyInfoDocsList
                  assessment={assessmentData}
                  onFileDelete={handleFileDelete}
                  canDeleteFile={canEditKeyInformationAndUpload}
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
  keyInformationHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  keyInformationSectionHeadingWrapper: {
    alignItems: 'flex-start',
    display: 'flex',
  },
  keyInformationSectionHeading: {
    flexGrow: '1',
  },
  keyInformationSectionHeadingMoreInfo: {
    ...theme.typography.h3,
    color: theme.palette.secondary.main,
    cursor: 'pointer',
    marginLeft: theme.spacing(2),
    whiteSpace: 'nowrap',
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

export default withStyles(styles, { withTheme: true })(AssessmentTemplate)
