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

const AssessmentTool = ({
  theme,
  classes,
  assessmentToolMeta,
  barColor,
  isAuthenticated,
}) => (
  <Grid item xs data-testid="assessment-tool">
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
      {isAuthenticated && (
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
      )}
    </Card>
  </Grid>
)

const styles = theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderTopWidth: theme.spacing(1),
    borderTopStyle: 'solid',
  },
  cardContent: {
    paddingTop: theme.spacing(1),
    flex: 1,
  },
  cardElement: {
    marginBottom: theme.spacing(2),
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
  isAuthenticated: T.bool.isRequired,
}

export default withStyles(styles, { withTheme: true })(AssessmentTool)
