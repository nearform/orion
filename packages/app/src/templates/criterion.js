import React from 'react'
import { Typography, withStyles, Grid, Button } from '@material-ui/core'
import { PaddedContainer } from 'components'
import { Link } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import { useTranslation } from 'react-i18next'

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
            <Grid item>
              <SectionTitle barColor={pillarColor}>
                {pillar.name} <span style={{ color: pillarColor }}>▶</span>{' '}
                {t(criterion.name)}
              </SectionTitle>
            </Grid>
            <Grid item xs>
              <Typography variant="body1" component="div" gutterBottom>
                <ReactMarkdown
                  source={t(criterion.description)}
                  renderers={{ paragraph: 'div' }}
                />
              </Typography>
              <Button
                component={Link}
                to={`${location.pathname}/1${
                  assessmentId ? `#${assessmentId}` : ''
                }`}
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
