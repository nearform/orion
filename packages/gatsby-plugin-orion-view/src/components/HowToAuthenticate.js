import React from 'react'
import T from 'prop-types'
import { Link, navigate } from 'gatsby'
import { withStyles, Typography, Button } from '@material-ui/core'

const HowToAuthenticate = ({ classes }) => (
  <div className={classes.wrapper}>
    <p className={classes.center}>
      <span className={classes.caption}>Have an account?</span>
      <Button
        color="secondary"
        variant="contained"
        className={classes.signInButton}
        onClick={() => navigate('/auth')}
      >
        Sign in
      </Button>
    </p>

    <Typography variant="h3" className={classes.title}>
      Why do I not have access?
    </Typography>
    <Typography variant="body1">
      Thank you very much for your interest in our Knowledge Base, which content
      is only accessible for the EFQM Members.
    </Typography>

    <Typography variant="h3" className={classes.title}>
      Your organisation is an EFQM member:
    </Typography>
    <Typography variant="body1">
      If you are not logged in, <Link to="/auth">click here to login</Link>.
    </Typography>
    <Typography variant="body1">
      If you are not registered to our website yet,{' '}
      <Link to="/auth/register">click here to register</Link>. Your access will
      be open as soon as possible.
    </Typography>

    <Typography variant="h3" className={classes.title}>
      Your organisation is not an EFQM member:
    </Typography>
    <Typography variant="body1">
      At this time, your organisation may not be a Member of EFQM.
    </Typography>
  </div>
)

HowToAuthenticate.propTypes = {
  classes: T.object.isRequired,
}

export default withStyles(theme => ({
  wrapper: {
    position: 'relative',
    paddingTop: theme.spacing(9),
    marginTop: theme.spacing(-8),
    background:
      'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 16%, rgba(0,0,0,0) 16%)',
  },
  center: {
    textAlign: 'center',
  },
  caption: {
    ...theme.typography.h4,
    color: theme.palette.tertiary.main,
  },
  signInButton: {
    marginLeft: theme.spacing(3),
    padding: theme.spacing(1, 7),
  },
  title: {
    ...theme.articleTypography.heading3,
    textTransform: 'none',
    '&:first-of-type': {
      marginTop: theme.spacing(4),
    },
  },
}))(HowToAuthenticate)
