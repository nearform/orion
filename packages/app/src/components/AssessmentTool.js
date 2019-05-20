import React from 'react'
import T from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import {
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  withStyles,
} from '@material-ui/core'

const AssessmentTool = ({ theme, classes, assessmentToolMeta, barColor }) => (
  <Grid item xs>
    <Card className={classes.card} style={{ borderTopColor: barColor }}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h3" className={classes.cardElement}>
          {assessmentToolMeta.name}
        </Typography>
        <Img
          fixed={assessmentToolMeta.logo.childImageSharp.fixed}
          className={classes.cardElement}
        />
        <Typography className={classes.cardElement}>
          {assessmentToolMeta.shortDescription}
        </Typography>
      </CardContent>
      <CardActions className={classes.bottom}>
        <Button
          component={Link}
          to={`/assessment/${assessmentToolMeta.key}`}
          color="secondary"
          fullWidth
        >
          {`Enter ${assessmentToolMeta.name}`}
        </Button>
      </CardActions>
    </Card>
  </Grid>
)

const styles = theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderTopWidth: theme.spacing.unit,
    borderTopStyle: 'solid',
  },
  cardContent: {
    paddingTop: theme.spacing.unit,
    flex: 1,
  },
  cardElement: {
    marginBottom: theme.spacing.unit * 2,
  },
  bottom: {
    borderTop: `solid 1px ${theme.palette.background.light}`,
  },
})

AssessmentTool.propTypes = {
  assessmentToolMeta: T.shape({
    name: T.string.isRequired,
    shortDescription: T.string.isRequired,
    logo: T.object.isRequired,
  }).isRequired,
  barColor: T.string.isRequired,
}

export default withStyles(styles, { withTheme: true })(AssessmentTool)
