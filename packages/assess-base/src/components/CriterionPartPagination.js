import React from 'react'
import T from 'prop-types'
import { withStyles, Grid, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

function CriterionPartPagination({
  theme,
  classes,
  link,
  previousLink,
  nextLink,
  assessmentId,
  partNumber,
  totalParts,
}) {
  const { t } = useTranslation()

  return (
    <Grid container spacing={2} justify="flex-end" alignItems="center">
      <Grid item className={classes.expandedClickAreaWrapper}>
        <Typography
          className={classes.expandedClickArea}
          color="secondary"
          component={link}
          to={`${previousLink}#${assessmentId}`}
          variant="body2"
        >
          ❮
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h3" color="secondary">
          {t('PART OF', { part: partNumber, total: totalParts })}
        </Typography>
      </Grid>
      <Grid item className={classes.expandedClickAreaWrapper}>
        <Typography
          className={classes.expandedClickArea}
          variant="body2"
          color="secondary"
          component={link}
          to={`${nextLink}#${assessmentId}`}
        >
          ❯
        </Typography>
      </Grid>
    </Grid>
  )
}

CriterionPartPagination.propTypes = {
  classes: T.object.isRequired,
  link: T.any,
  previousLink: T.string,
  nextLink: T.string,
  assessmentId: T.number.isRequired,
  partNumber: T.number.isRequired,
  totalParts: T.number.isRequired,
}

const styles = theme => ({
  expandedClickArea: {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 'calc(50% - 16px)',
      left: 'calc(50% - 16px)',
      width: '32px',
      height: '32px',
    },
  },
  expandedClickAreaWrapper: {
    position: 'relative',
  },
})

export default withStyles(styles, { withTheme: true })(CriterionPartPagination)
