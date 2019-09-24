import React from 'react'
import { withStyles } from '@material-ui/core'

/*
 * Placeholder function for promo-spots
 * Definitely requires refactoring for full implementation
 */

function PromoSpot({ classes }) {
  return (
    <div
      className={classes.promoImage}
      style={{
        backgroundImage: undefined,
      }}
    />
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
