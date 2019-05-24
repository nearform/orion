import React, { Fragment, useEffect, useState } from 'react'
import { Typography, withStyles, Grid, Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { PaddedContainer } from 'components'
import { Link, navigate } from 'gatsby'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { useMutation, useManualQuery } from 'graphql-hooks'
import HelpIcon from '@material-ui/icons/Help'

import SEO from '../components/seo'
import SectionTitle from '../components/SectionTitle'
import {
  createAssessmentMutation,
  getShallowAssessmentData,
  createFileUploadMutation,
  updateAssessmentKeyInfoMutation,
} from '../queries'
import { getUserIdSync } from '../utils/auth'
import { getAssessmentId } from '../utils/url'
import { uploadFile } from '../utils/storage'
import ContextualHelp from '../components/ContextualHelp'
import UploadButton from '../components/UploadButton'
import ImagePlaceholder from '../components/ImagePlaceholder'
import FileItem from '../components/FileItem'

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

function AssessmentTemplate({
  location,
  theme,
  classes,
  pageContext: { assessment, pillarColors },
}) {
  const assessmentId = getAssessmentId(location)

  const { t } = useTranslation()

  const [assessmentData, setAssessmentData] = useState()
  const [createAssessment] = useMutation(createAssessmentMutation)
  const [updateAssessmentKeyInfo] = useMutation(updateAssessmentKeyInfoMutation)
  const [getAssessment] = useManualQuery(getShallowAssessmentData)
  const [createFileUpload] = useMutation(createFileUploadMutation)

  useEffect(() => {
    if (assessmentId) {
      loadAssessment(assessmentId)
    }
  }, [assessmentId])

  async function handleCreateAssessment({ name }) {
    const userId = getUserIdSync()

    const {
      data: {
        insert_assessment: {
          returning: [{ id }],
        },
      },
    } = await createAssessment({
      variables: {
        key: assessment.key,
        name,
        ownerId: userId,
      },
    })

    navigate(`${location.pathname}#${id}`)
  }

  async function loadAssessment(id) {
    const {
      data: { assessment_by_pk: assessmentData },
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

  async function createNewFileUpload(assessmentId, fileName, s3Key) {
    const userId = getUserIdSync()
    const { data, error } = await createFileUpload({
      variables: {
        fileUploadData: {
          user_id: userId,
          assessment_id: assessmentId,
          file_name: fileName,
          s3_key: s3Key,
        },
      },
    })

    if (error) throw error

    return data.insert_assessment_file.returning[0].id
  }

  async function handleFileUpload(file) {
    const { key: s3Key } = await uploadFile(file, assessmentId)
    await createNewFileUpload(assessmentId, file.name, s3Key)
    await loadAssessment(assessmentId)
  }

  return (
    <>
      <SEO title={t('Your assessments')} />
      <PaddedContainer>
        <Button component={Link} to="/" variant="text" color="secondary">
          ◀ Assess base home
        </Button>
        <div className={classes.section}>
          <Grid container spacing={theme.spacing.unit * 4}>
            <Grid
              item
              xs={9}
              container
              direction="column"
              wrap="nowrap"
              spacing={theme.spacing.unit * 4}
            >
              <Grid item container xs={12}>
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
                  {assessmentData && (
                    <Button type="submit" color="secondary" variant="contained">
                      Submit Assessment
                    </Button>
                  )}
                </Grid>
              </Grid>
              <Grid item xs>
                {assessmentData ? (
                  <>
                    <Typography variant="h4" gutterBottom>
                      assessment name
                    </Typography>
                    <Typography variant="h2" color="primary">
                      {assessmentData.name}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h4" gutterBottom>
                      Enter your assessment name
                    </Typography>
                    <Formik
                      enableReinitialize
                      initialValues={{
                        name: '',
                      }}
                      validate={({ name }) => !!name}
                      onSubmit={handleCreateAssessment}
                    >
                      {({ isValid }) => (
                        <Form>
                          <Grid container spacing={theme.spacing.unit * 2}>
                            <Grid item xs>
                              <Field
                                name="name"
                                component={TextField}
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs>
                              <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                                disabled={!isValid}
                              >
                                Create Assessment
                              </Button>
                            </Grid>
                          </Grid>
                        </Form>
                      )}
                    </Formik>
                  </>
                )}
              </Grid>
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
                      <Grid container spacing={theme.spacing.unit * 2}>
                        {assessment.keyInformation.keyInformationItems.map(
                          (keyInfo, index) => (
                            <Fragment key={keyInfo.key}>
                              <Grid item xs={6}>
                                <Typography variant="h4" gutterBottom>
                                  {keyInfo.name}
                                </Typography>
                                <Field
                                  name={keyInfo.key}
                                  component={TextField}
                                  fullWidth
                                  multiline
                                  rows={5}
                                />
                              </Grid>
                              {index === 0 && <Grid item xs={6} />}
                            </Fragment>
                          )
                        )}
                      </Grid>
                      <Grid item xs className={classes.buttonBar}>
                        <UploadButton
                          onFileSelected={handleFileUpload}
                          color="secondary"
                          variant="outlined"
                          disabled={!assessmentData}
                        >
                          upload key information
                        </UploadButton>
                        <Button
                          type="submit"
                          color="secondary"
                          variant="contained"
                          disabled={!assessmentData || !dirty}
                        >
                          Save Updates
                        </Button>
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
              <Grid item>
                <Typography variant="h3" gutterBottom>
                  Assessment Documents
                </Typography>
              </Grid>
              {(!assessmentData ||
                (assessmentData && assessmentData.files.length === 0)) && (
                <Typography>
                  You'll find an index of uploaded documents for your assessment
                  in this area
                </Typography>
              )}
              {assessmentData &&
                assessmentData.files.map(file => (
                  <Grid item key={file.s3_key}>
                    <FileItem file={file} />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </div>
        <div className={classes.section}>
          <Grid container spacing={theme.spacing.unit * 3}>
            <Grid item>
              <Typography variant="h4" gutterBottom>
                to enter the assessment please click on an area of the model
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={theme.spacing.unit * 2}>
            {assessment.pillars.map((pillar, pillarIndex) => {
              const pillarColor = pillarColors[pillarIndex]
              return (
                <Grid
                  key={pillar.name}
                  item
                  xs
                  container
                  spacing={theme.spacing.unit * 3}
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
                        component={Link}
                        to={`assessment/${assessment.key}/${pillar.key}/${
                          criterion.key
                        }${assessmentData ? `#${assessmentData.id}` : ''}`}
                        variant="h3"
                        gutterBottom
                        style={{ color: pillarColor }}
                      >
                        {criterion.name}
                      </Typography>
                      <Typography
                        variant="h4"
                        className={classes.sectionProgress}
                      >
                        {criterion.parts.length} Subcriteria
                      </Typography>
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
                spacing={theme.spacing.unit * 3}
                direction="column"
              >
                <Grid item xs>
                  <SectionTitle
                    barColor={theme.palette.primary.dark}
                    gutterBottom
                  >
                    Scoring Summary
                  </SectionTitle>
                  <ImagePlaceholder>
                    <Typography variant="h4">Scoring Summary</Typography>
                  </ImagePlaceholder>
                </Grid>
              </Grid>
            )}
          </Grid>
        </div>
      </PaddedContainer>
    </>
  )
}

const styles = theme => ({
  section: {
    margin: `${theme.spacing.unit * 3}px 0`,
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  helpIcon: {
    marginLeft: theme.spacing.unit,
  },
  keyInformationInput: {
    marginBottom: theme.spacing.unit * 2,
  },
  sectionProgress: {
    color: theme.palette.primary.dark,
  },
  filesSeparator: {
    borderLeft: `solid 1px ${theme.palette.background.light}`,
  },
  keyInformationHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing.unit * 2,
  },
  buttonBar: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing.unit * 2,
    },
  },
})

export default withStyles(styles, { withTheme: true })(AssessmentTemplate)
