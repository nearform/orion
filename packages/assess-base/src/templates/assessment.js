import React, { Fragment, useEffect, useState } from 'react'
import { Typography, withStyles, Grid, Button, Box } from '@material-ui/core'
import { Link, navigate } from 'gatsby'
import { Formik, Form, Field } from 'formik'
import {
  TextField as FormikTextField,
  Switch as FormikSwitch,
} from 'formik-material-ui'
import { useMutation, useManualQuery } from 'graphql-hooks'
import HelpIcon from '@material-ui/icons/Help'
import get from 'lodash/get'
import * as Yup from 'yup'
import matrixData from 'efqm-theme/assessments'

import {
  PaddedContainer,
  ASSESSMENT_STATUS,
  ConfirmDialog,
  SectionTitle,
} from 'components'
import SEO from '../components/SEO'
import {
  createAssessmentMutation,
  getShallowAssessmentData,
  createFileUploadMutation,
  updateAssessmentKeyInfoMutation,
  updateAssessmentStatusMutation,
} from '../queries'
import { getUserTokenData } from '../utils/auth'
import { getAssessmentId } from '../utils/url'
import { uploadFile } from '../utils/storage'
import ContextualHelp from '../components/ContextualHelp'
import ContentModal from '../components/ContentModal'
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
  const userTokenData = getUserTokenData()

  if (!assessmentId && !userTokenData.isAdmin) {
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
        owner_id: userTokenData.userId,
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
          user_id: userTokenData.userId,
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
    (userTokenData.isAdmin || userTokenData.isContributor) &&
    assessmentInProgress(assessmentData)

  const canSubmit =
    userTokenData.isAdmin && assessmentInProgress(assessmentData)

  const canCreateAssessment = userTokenData.isAdmin

  // TODO: change this with correct rule based on assessment state
  const canViewFeedbackReport = assessmentSubmitted(assessmentData)

  const canAssignContributorsAndAssessors =
    (userTokenData.isAdmin &&
      getCanEditAssesors(userTokenData.groupId, assessmentData)) ||
    getCanEditContributors(userTokenData.groupId, assessmentData)

  const assessmentName = get(assessmentData, 'name', 'Loading...')

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
          ◀ Assess base home
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
                        {get(assessmentData, 'internal') ? 'internal' : ''}{' '}
                        assessment name
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
                <Grid item xs>
                  <Button
                    variant="outlined"
                    color="secondary"
                    component={Link}
                    to={`assessment/${assessment.key}/contributors-assessors#${assessmentId}`}
                  >
                    Assign Contributors and Assessors
                  </Button>
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
                <KeyInfoDocsList assessment={assessmentData} />
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
})

export default withStyles(styles, { withTheme: true })(AssessmentTemplate)
