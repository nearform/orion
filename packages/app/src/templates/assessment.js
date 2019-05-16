import React, { useEffect, useState } from 'react'
import { Typography, withStyles, Grid, Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { PaddedContainer } from 'components'
import { Link, navigate } from 'gatsby'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { useMutation, useManualQuery } from 'graphql-hooks'

import SEO from '../components/seo'
import SectionTitle from '../components/SectionTitle'
import { createAssessmentMutation, getShallowAssessmentData } from '../queries'
import { getUserIdSync } from '../utils/auth'
import { getAssessmentId } from '../utils/url'

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
              <SectionTitle barColor={theme.palette.secondary.main}>
                {assessment.name}
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
            <Grid item xs>
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
                    <Button color="secondary" variant="outlined">
                      upload key information
                    </Button>
                  </Form>
                )}
              </Formik>
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
  keyInformationInput: {
    marginBottom: theme.spacing.unit * 2,
  },
  sectionProgress: {
    color: theme.palette.primary.dark,
  },
})

export default withStyles(styles, { withTheme: true })(AssessmentTemplate)
