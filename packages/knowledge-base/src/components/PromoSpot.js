import React from 'react'
import { withStyles, Grid } from '@material-ui/core'

/*
 * Placeholder function for promo-spots
 * Definitely requires refactoring for full implementation
 */

function PromoSpot({ classes }) {
  return (
    <Grid item xs={12} md={3} sm={4}>
      <div
        className={classes.promoImage}
        style={{
          backgroundImage: undefined,
        }}
      />
    </Grid>
  )
}

const styles = theme => ({
  promoImage: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.light,
    backgroundPosition: 'left',
    backgroundSize: 'cover',
  },
})

export default withStyles(styles)(PromoSpot)
