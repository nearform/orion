import React from 'react'
import { Typography, withStyles, Grid, Button } from '@material-ui/core'
import { PaddedContainer } from 'components'
import { Link } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import { useTranslation } from 'react-i18next'
import { Field, Formik, Form } from 'formik'
import { TextField } from 'formik-material-ui'

import SEO from '../components/seo'
import SectionTitle from '../components/SectionTitle'
import { getAssessmentId } from '../utils/url'

function CriterionTemplate({
  theme,
  classes,
  pageContext: { assessment, pillar, criterion, pillarColor },
  location,
}) {
  const assessmentId = getAssessmentId(location)

  const { t } = useTranslation()

  return (
    <div className={classes.root}>
      <SEO title={criterion.name} />
      <PaddedContainer className={classes.paddedContainer}>
        <Button
          component={Link}
          to={`assessment/${assessment.key}#${assessmentId}`}
          variant="text"
          color="secondary"
        >
          ◀ Assessment overview
        </Button>
        <div className={classes.section}>
          <Grid container spacing={theme.spacing.unit * 4}>
            <Grid item xs={3}>
              <SectionTitle barColor={pillarColor}>
                {pillar.name} <span style={{ color: pillarColor }}>▶</span>{' '}
                {t(criterion.name)}
              </SectionTitle>
            </Grid>
            <Grid item xs>
              <Typography variant="body2" component="div">
                <ReactMarkdown
                  source={t(criterion.description)}
                  renderers={{ paragraph: 'div' }}
                />
              </Typography>
              <Button
                component={Link}
                to={`${location.pathname}/1#${assessmentId}`}
                variant="contained"
                color="secondary"
                className={classes.section}
              >
                Assess {criterion.name}
              </Button>
              <Grid
                container
                direction="column"
                spacing={theme.spacing.unit * 2}
                className={classes.section}
              >
                <Grid item xs={6}>
                  <Typography variant="h4" gutterBottom>
                    {criterion.name} summary
                  </Typography>
                  <Formik>
                    <Form>
                      <Field
                        component={TextField}
                        name="summary"
                        multiline
                        rows={4}
                        fullWidth
                      />
                    </Form>
                  </Formik>
                </Grid>
                <Grid item container spacing={theme.spacing.unit * 2}>
                  <Grid item>
                    <Button variant="outlined" color="secondary">
                      Upload
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="secondary">
                      Save Updates
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
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
  section: {
    marginTop: theme.spacing.unit * 3,
  },
})

export default withStyles(styles, { withTheme: true })(CriterionTemplate)
