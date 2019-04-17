import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, Typography } from '@material-ui/core'
import NFLogo from '../../../assets/NF_Shared_Brand_Assets_icon_reverse.png'

const Logo = ({ classes, logoSrc }) => (
  <div className={classes.root}>
    <img className={classes.logo} src={logoSrc} />
    <Typography variant="h5" className={classes.textWhite}>
      NearForm
    </Typography>
  </div>
)

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '50px',
  },
  logo: {
    height: '100%',
  },
  textWhite: {
    color: '#ffffff',
  },
})

Logo.defaultProps = {
  logoSrc: NFLogo,
}

Logo.propTypes = {
  classes: PropTypes.object,
  logoSrc: PropTypes.string,
}

export default withStyles(styles)(Logo)
