import React from 'react'
import T from 'prop-types'
import { Grid, Typography, withTheme } from '@material-ui/core'

function CriterionPartPagination({
  theme,
  link,
  previousLink,
  nextLink,
  assessmentId,
  partNumber,
  totalParts,
}) {
  return (
    <Grid
      container
      spacing={theme.spacing.unit * 2}
      justify="flex-end"
      alignItems="center"
    >
      <Grid item>
        {previousLink ? (
          <Typography
            color="secondary"
            component={link}
            to={`${previousLink}#${assessmentId}`}
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
        <Typography variant="h3" color="secondary">
          PART {partNumber} OF {totalParts}
        </Typography>
      </Grid>
      <Grid item>
        {nextLink ? (
          <Typography
            variant="body1"
            color="secondary"
            component={link}
            to={`${nextLink}#${assessmentId}`}
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
  )
}

CriterionPartPagination.propTypes = {
  theme: T.object.isRequired,
  link: T.any,
  previousLink: T.string,
  nextLink: T.string,
  assessmentId: T.number.isRequired,
  partNumber: T.number.isRequired,
  totalParts: T.number.isRequired,
}

export default withTheme()(CriterionPartPagination)
