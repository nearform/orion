import React, { useEffect, useState } from 'react'
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
} from '../queries'
import { getUserIdSync } from '../utils/auth'
import { getAssessmentId } from '../utils/url'
import { uploadFile, downloadFile } from '../utils/storage'
import ContextualHelp from '../components/ContextualHelp'
import UploadButton from '../components/UploadButton'

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

  return (
    <>
      <SEO title={t('Your assessments')} />
      <PaddedContainer>
        <Button component={Link} to="/" variant="text" color="secondary">
          ◀ Assess base home
        </Button>
        <div className={classes.section}>
          <Grid container spacing={theme.spacing.unit * 4}>
            <Grid item xs={4}>
              <SectionTitle
                barColor={theme.palette.primary.dark}
                className={classes.sectionTitle}
              >
                {assessment.name}
                {assessment.guidance && (
                  <ContextualHelp helpContent={assessment.guidance}>
                    <HelpIcon color="secondary" className={classes.helpIcon} />
                  </ContextualHelp>
                )}
              </SectionTitle>
            </Grid>
          </Grid>
        </div>
        <div className={classes.section}>
          <Grid container spacing={theme.spacing.unit * 4}>
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
                    <Field
                      disabled={!!assessmentData}
                      name="name"
                      component={TextField}
                      fullWidth
                    />
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
                  </Form>
                )}
              </Formik>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                Add key information
              </Typography>
              <Typography>
                Key Information is those key facts about your organisation which
                help assessors to gain an overall view of your organisation and
                its strategic context.
              </Typography>
            </Grid>
            <Grid item xs container>
              <Grid item>
                <Formik>
                  {() => (
                    <Form>
                      <Field
                        name="keyInformation"
                        component={TextField}
                        fullWidth
                        multiline
                        rows={5}
                        className={classes.keyInformationInput}
                      />
                      <UploadButton
                        onFileSelected={handleFileUpload}
                        color="secondary"
                        variant="outlined"
                        disabled={!assessmentData}
                      >
                        upload key information
                      </UploadButton>
                    </Form>
                  )}
                </Formik>
              </Grid>
              <Grid item container spacing={theme.spacing.unit}>
                {assessmentData &&
                  assessmentData.files.map(file => (
                    <Grid item key={file.s3_key}>
                      <Button variant="text" onClick={_ => downloadFile(file)}>
                        {file.file_name}
                      </Button>
                    </Grid>
                  ))}
              </Grid>
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
                        0% complete
                      </Typography>
                    </Grid>
                  ))}{' '}
                </Grid>
              )
            })}
          </Grid>
        </div>
        <div className={classes.section}>
          <Grid container spacing={theme.spacing.unit * 2}>
            <Grid item xs={3}>
              <SectionTitle gutterBottom barColor={theme.palette.primary.dark}>
                lens view
              </SectionTitle>
              <Typography>
                If you would like to lead your assessment through one of the
                following lenses you can follow these paths.
              </Typography>
            </Grid>
            <Grid item xs>
              <Button fullWidth color="secondary" variant="outlined">
                innovation
              </Button>
            </Grid>
            <Grid item xs>
              <Button fullWidth color="secondary" variant="outlined">
                circular economy
              </Button>
            </Grid>
            <Grid item xs>
              <Button fullWidth color="secondary" variant="outlined">
                lens 3
              </Button>
            </Grid>
            <Grid item xs>
              <Button fullWidth color="secondary" variant="outlined">
                lens 4
              </Button>
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
})

export default withStyles(styles, { withTheme: true })(AssessmentTemplate)
