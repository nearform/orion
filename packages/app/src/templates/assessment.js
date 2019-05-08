import React from 'react'
import {
  Typography,
  withStyles,
  Grid,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  TextField,
  Button,
  Paper,
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { AssessmentProgress, PaddedContainer } from 'components'
import { Link } from 'gatsby'

import SEO from '../components/seo'
import ImagePlaceholder from '../components/ImagePlaceholder'
import SectionTitle from '../components/SectionTitle'
import AssessmentStatusChip, {
  ASSESSMENT_STATUS,
} from 'components/src/components/AssessmentStatusChip'

const mockAssessments = [
  {
    name: 'Q1  Assessment for Company A',
    updated_at: new Date().toLocaleDateString(),
    status: ASSESSMENT_STATUS.inProgress,
  },
  {
    name: 'Another  Assessment for Company A',
    updated_at: new Date().toLocaleDateString(),
    status: ASSESSMENT_STATUS.submitted,
  },
  {
    name: 'Assessment for Company B',
    updated_at: new Date().toLocaleDateString(),
    status: ASSESSMENT_STATUS.closed,
  },
]

function AssessmentTemplate({
  theme,
  classes,
  pageContext: { assessment, pillarColors },
}) {
  const { t } = useTranslation()

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
              <SectionTitle barColor={theme.palette.primary.dark}>
                {assessment.name}
              </SectionTitle>
            </Grid>
          </Grid>
        </div>
        <div className={classes.section}>
          <Grid container spacing={theme.spacing.unit * 4}>
            <Grid item xs={7}>
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{t('Your assessments')}</TableCell>
                      <TableCell>Last Updated</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockAssessments.map(assessment => (
                      <TableRow key={assessment.name}>
                        <TableCell>{assessment.name}</TableCell>
                        <TableCell>{assessment.updated_at}</TableCell>
                        <TableCell>
                          <AssessmentStatusChip status={assessment.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <Grid item xs={5}>
              <ImagePlaceholder>
                <Typography variant="h4">Pic of Model 2020</Typography>
              </ImagePlaceholder>
            </Grid>
          </Grid>
        </div>
        <div className={classes.section}>
          <Grid container spacing={theme.spacing.unit * 4}>
            <Grid item xs={3}>
              <SectionTitle barColor={theme.palette.primary.dark}>
                Your organisation
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
              <TextField fullWidth />
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
              <TextField
                fullWidth
                multiline
                rows={5}
                className={classes.keyInformationInput}
              />
              <Button color="secondary" variant="outlined">
                upload key information
              </Button>
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
                        }`}
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
      <AssessmentProgress />
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
