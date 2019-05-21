import React, { useEffect, useState } from 'react'
import { Typography, withStyles, Grid, Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { PaddedContainer } from 'components'
import { Link, navigate } from 'gatsby'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { useMutation, useManualQuery } from 'graphql-hooks'
import HelpIcon from '@material-ui/icons/Help'
import AttachmentIcon from '@material-ui/icons/Attachment'

import SEO from '../components/seo'
import SectionTitle from '../components/SectionTitle'
import {
  createAssessmentMutation,
  getShallowAssessmentData,
  createFileUploadMutation,
} from '../queries'
import { getUserIdSync } from '../utils/auth'
import { getAssessmentId } from '../utils/url'
import { uploadFile, downloadFile } from '../utils/storage'
import ContextualHelp from '../components/ContextualHelp'
import UploadButton from '../components/UploadButton'
import ImagePlaceholder from '../components/ImagePlaceholder'

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

  const [
    keyInformationHeader,
    ...keyInformationItems
  ] = assessment.keyInformation.keyInformationItems

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
              <Grid item xs={5}>
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
              <Grid item xs>
                <Typography variant="h4" gutterBottom>
                  Enter your assessment name
                </Typography>
                <Formik
                  enableReinitialize
                  initialValues={{
                    name: assessmentData ? assessmentData.name : '',
                  }}
                  validate={({ name }) => !!name}
                  onSubmit={handleCreateAssessment}
                >
                  {({ isValid }) => (
                    <Form>
                      <Grid container spacing={theme.spacing.unit * 2}>
                        <Grid item xs>
                          <Field
                            disabled={!!assessmentData}
                            name="name"
                            component={TextField}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs>
                          {!assessmentData && (
                            <Button
                              type="submit"
                              color="secondary"
                              variant="contained"
                              disabled={!isValid}
                            >
                              Create Assessment
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
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
                {keyInformationHeader && (
                  <Formik>
                    {({ isValid }) => (
                      <Form>
                        <Grid container spacing={theme.spacing.unit * 2}>
                          <Grid item xs={6}>
                            <Typography variant="h4" gutterBottom>
                              {keyInformationHeader.name}
                            </Typography>
                            <Field
                              name={`keyInformation-${
                                keyInformationHeader.key
                              }`}
                              component={TextField}
                              fullWidth
                              multiline
                              rows={5}
                            />
                          </Grid>
                          <Grid item xs />
                          {keyInformationItems.map(keyInfo => (
                            <Grid item key={keyInfo.key} xs={6}>
                              <Typography variant="h4" gutterBottom>
                                {keyInfo.name}
                              </Typography>
                              <Field
                                name={`keyInformation-${keyInfo.key}`}
                                component={TextField}
                                fullWidth
                                multiline
                                rows={5}
                              />
                            </Grid>
                          ))}
                        </Grid>
                        <Grid item xs container justify="flex-end">
                          <UploadButton
                            onFileSelected={handleFileUpload}
                            color="secondary"
                            variant="outlined"
                            disabled={!assessmentData}
                            className={classes.uploadButton}
                          >
                            upload key information
                          </UploadButton>
                          <Button
                            type="submit"
                            color="secondary"
                            variant="contained"
                            disabled={!isValid}
                          >
                            Save Updates
                          </Button>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                )}
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
              {!assessmentData && (
                <Typography>
                  You'll find an index of uploaded documents for your assessment
                  in this area
                </Typography>
              )}
              {assessmentData &&
                assessmentData.files.map(file => (
                  <Grid item key={file.s3_key}>
                    <Button variant="text" onClick={_ => downloadFile(file)}>
                      <AttachmentIcon className={classes.attachmentIcon} />
                      <div className={classes.attachment}>
                        <Typography variant="h4">{file.file_name}</Typography>
                        <Typography variant="h4" color="secondary">
                          2 MB
                        </Typography>
                      </div>
                    </Button>
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
  uploadButton: {
    marginRight: theme.spacing.unit * 2,
  },
  attachmentIcon: {
    marginRight: theme.spacing.unit,
    color: theme.palette.secondary.light,
  },
  attachment: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
})

export default withStyles(styles, { withTheme: true })(AssessmentTemplate)
