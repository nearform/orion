import React from 'react'
import T from 'prop-types'
import { Grid, Typography, withTheme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

function CriterionPartPagination({
  theme,
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
      <Grid item>
        {previousLink ? (
          <Typography
            color="secondary"
            component={link}
            to={`${previousLink}#${assessmentId}`}
            variant="body2"
          >
            ❮
          </Typography>
        ) : (
          <Typography variant="body2" color="textSecondary">
            ❮
          </Typography>
        )}
      </Grid>
      <Grid item>
        <Typography variant="h3" color="secondary">
          {t('PART OF', { part: partNumber, total: totalParts })}
        </Typography>
      </Grid>
      <Grid item>
        {nextLink ? (
          <Typography
            variant="body2"
            color="secondary"
            component={link}
            to={`${nextLink}#${assessmentId}`}
          >
            ❯
          </Typography>
        ) : (
          <Typography variant="body2" color="textSecondary">
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

export default withTheme(CriterionPartPagination)
