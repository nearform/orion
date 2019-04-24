import React from 'react'
import {
  withStyles,
  Grid,
  Button,
  Typography,
  TextField,
  Paper,
} from '@material-ui/core'
import { AssessmentProgress, PaddedContainer, ScoringSlider } from 'components'
import { Link } from 'gatsby'

import SEO from '../components/seo'
import SectionTitle from '../components/SectionTitle'

function CriterionPartTemplate({
  theme,
  classes,
  pageContext: {
    assessmentSlug,
    pillarSlug,
    criterionSlug,
    partNumber,
    part,
    assessment,
    pillar,
    criterion,
    pillarColor,
    previousLink,
    nextLink,
    totalParts,
  },
}) {
  return (
    <div className={classes.root}>
      <SEO title={criterion.name} />
      <PaddedContainer className={classes.paddedContainer}>
        <Button
          component={Link}
          to={`assessment/${assessmentSlug}`}
          variant="text"
          color="secondary"
        >
          ◀ Assessment overview
        </Button>
        <div className={classes.section}>
          <Grid container spacing={theme.spacing.unit * 4}>
            <Grid item>
              <SectionTitle barColor={pillarColor}>
                {pillar.name} <span style={{ color: pillarColor }}>▶</span>{' '}
                {criterion.name}
              </SectionTitle>
            </Grid>
          </Grid>
        </div>
        <div className={classes.section}>
          <Grid container spacing={theme.spacing.unit * 2} justify="flex-end">
            <Grid item>
              {previousLink ? (
                <Typography
                  color="secondary"
                  component={Link}
                  to={previousLink}
                  variant="body1"
                >
                  ❮
                </Typography>
              ) : (
                <Typography variant="body1" color="textSecondary">
                  ❮
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Typography variant="body1">
                PART {partNumber} OF {totalParts}
              </Typography>
            </Grid>
            <Grid item>
              {nextLink ? (
                <Typography
                  variant="body1"
                  color="secondary"
                  component={Link}
                  to={nextLink}
                >
                  ❯
                </Typography>
              ) : (
                <Typography variant="body1" color="textSecondary">
                  ❯
                </Typography>
              )}
            </Grid>
          </Grid>
        </div>
        {part.tables.map(table => (
          <div className={classes.section} key={table.name}>
            <Typography variant="h2" color="primary" gutterBottom>
              {table.name}
            </Typography>
            <Grid container spacing={theme.spacing.unit * 2}>
              {table.columns.map(column => (
                <Grid item xs={4} key={column.name}>
                  <Typography variant="h3" gutterBottom>
                    {column.name}
                  </Typography>
                  <TextField fullWidth />
                </Grid>
              ))}
            </Grid>
            <Grid container spacing={theme.spacing.unit * 2} justify="flex-end">
              <Grid item>
                <Button variant="outlined" color="secondary">
                  Add new item
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary">
                  Save Updates
                </Button>
              </Grid>
            </Grid>
          </div>
        ))}
      </PaddedContainer>
      <Paper className={classes.scoringSection} elevation={0}>
        <PaddedContainer>
          <Typography variant="h2" color="primary" gutterBottom>
            Scoring Section
          </Typography>
          <Grid container spacing={theme.spacing.unit * 2}>
            {(part.scoring || []).map(score => (
              <Grid item key={score.name} xs>
                <ScoringSlider label={score.name} value={0} />
              </Grid>
            ))}
            <Grid item xs>
              <ScoringSlider label="Overall" value={0} />
            </Grid>
          </Grid>
        </PaddedContainer>
      </Paper>
      <AssessmentProgress />
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
    margin: `${theme.spacing.unit * 3}px 0`,
  },
  scoringSection: {
    padding: `${theme.spacing.unit * 3}px 0`,
  },
})

export default withStyles(styles, { withTheme: true })(CriterionPartTemplate)
