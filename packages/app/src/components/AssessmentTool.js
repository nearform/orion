import React from 'react'
import T from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { Button, Grid, Typography, withTheme } from '@material-ui/core'

import SectionTitle from '../components/SectionTitle'

const AssessmentTool = ({ theme, classes, assessmentToolMeta, barColor }) => (
  <Grid item xs container>
    <Grid
      container
      direction="column"
      justify="center"
      spacing={theme.spacing.unit * 2}
    >
      <Grid item>
        <SectionTitle barColor={barColor}>
          {assessmentToolMeta.name}
        </SectionTitle>
      </Grid>
      <Grid item>
        <Img fixed={assessmentToolMeta.logo.childImageSharp.fixed} />
      </Grid>
      <Grid item>
        <Typography gutterBottom>
          {assessmentToolMeta.shortDescription}
        </Typography>
      </Grid>
      <Grid item xs />
      <Grid item>
        <Button
          component={Link}
          to={`/assessment/${assessmentToolMeta.key}`}
          color="secondary"
          variant="outlined"
          fullWidth
        >
          {`Enter ${assessmentToolMeta.name}`}
        </Button>
      </Grid>
    </Grid>
  </Grid>
)

AssessmentTool.propTypes = {
  assessmentToolMeta: T.shape({
    name: T.string.isRequired,
    shortDescription: T.string.isRequired,
    logo: T.object.isRequired,
  }).isRequired,
  barColor: T.string.isRequired,
}

export default withTheme()(AssessmentTool)
