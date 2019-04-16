import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, Typography } from '@material-ui/core'
import NFLogo from '../../../assets/NF_Shared_Brand_Assets_icon_reverse.png'

const inlineStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: '50px',
}

const Logo = ({ classes, logoSrc }) => (
  <div style={inlineStyle}>
    <img style={{ height: '100%' }} src={logoSrc} />
    <Typography variant="h5" color="textPrimary" classes={classes}>
      NearForm
    </Typography>
  </div>
)

const styles = theme => ({
  colorTextPrimary: {
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
