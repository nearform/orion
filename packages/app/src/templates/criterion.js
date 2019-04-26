import React from 'react'
import { Typography, withStyles, Grid, Button } from '@material-ui/core'
import { AssessmentProgress, PaddedContainer } from 'components'
import { Link } from 'gatsby'

import SEO from '../components/seo'
import SectionTitle from '../components/SectionTitle'

function CriterionTemplate({
  theme,
  classes,
  pageContext: { assessment, pillar, criterion, pillarColor },
  location,
}) {
  return (
    <div className={classes.root}>
      <SEO title={criterion.name} />
      <PaddedContainer className={classes.paddedContainer}>
        <Button
          component={Link}
          to={`assessment/${assessment.key}`}
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
            <Grid item xs>
              <Typography variant="body1">
                Excellent organisations have leaders who shape the future and
                make it happen, acting as role models for it's values and ethics
                and inspiring trust at all times. They are flexible, enabling
                the organisation to anticipate and react in a timely manner to
                ensure the on-going success of the organisation.
              </Typography>
              <Typography
                variant="body1"
                component="ul"
                className={classes.section}
              >
                <li>
                  Leaders develop the mission, vision, values and ethics and act
                  as role models.
                </li>
                <li>
                  Leaders define, monitor, review and drive the improvement of
                  the organisation's management system and performance.
                </li>
                <li>Leaders engage with external stakeholders.</li>
                <li>
                  Leaders reinforce a culture of excellence with the
                  organisation's people.
                </li>
                <li>
                  Leaders ensure that the organisation is flexible and manages
                  change effectively.
                </li>
              </Typography>
              <Button
                component={Link}
                to={`${location.pathname}/1`}
                variant="contained"
                color="secondary"
                className={classes.section}
              >
                Assess {criterion.name}
              </Button>
            </Grid>
          </Grid>
        </div>
      </PaddedContainer>
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
})

export default withStyles(styles, { withTheme: true })(CriterionTemplate)
