import React from 'react'
import T from 'prop-types'
import { withStyles, Grid, Typography } from '@material-ui/core'
import { Link } from '@reach/router'
import PaddedContainer from '../PaddedContainer'

function Footer({ classes, Img, socialIcons = [], Logo }) {
  return (
    <div className={classes.footer}>
      <PaddedContainer>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography gutterBottom variant="body2" className="greeting1">
              Get in touch
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography component="div" variant="body1">
              <div>Acme Insurance</div>
              <div>London</div>
              <div>United Kingdom</div>
              <div>C14 W5X</div>
            </Typography>
          </Grid>
          <Grid container item xs={4} justify="flex-end">
            <Grid container item xs={12} justify="flex-end">
              <Grid item component={Link} to="/">
                <Logo width="107" />
              </Grid>
            </Grid>
            <Grid
              container
              item
              direction="row"
              xs={12}
              spacing={6}
              className="social-logos"
              alignItems="center"
              justify="flex-end"
            >
              {socialIcons.map(({ logo, url }) => (
                <Grid key={`sl-${url}`} item>
                  <a key={url} href={url} data-testid={url}>
                    <Img src={logo} />
                  </a>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={1} justify="center" className="terms">
          <Grid item>
            <Typography display="inline" variant="body1">
              © Acme Insurance
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              display="inline"
              variant="body1"
              component={Link}
              to="/terms"
            >
              Terms of Use
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              display="inline"
              variant="body1"
              component={Link}
              to="/privacy"
            >
              Privacy Statement
            </Typography>
          </Grid>
        </Grid>
      </PaddedContainer>
    </div>
  )
}

const styles = theme => ({ ...theme.footer })

Footer.propTypes = {
  classes: T.object,
  Img: T.elementType.isRequired,
  socialIcons: T.arrayOf(T.object),
  Logo: T.element,
}

Footer.defaultProps = {
  classes: {},
  socialIcons: [],
  Logo: undefined,
}

export default withStyles(styles, { withTheme: true })(Footer)
