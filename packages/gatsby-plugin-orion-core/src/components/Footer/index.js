import React from 'react'
import T from 'prop-types'
import { withStyles, Grid, Typography } from '@material-ui/core'
import PaddedContainer from '../PaddedContainer'

function Footer({ classes, Img, socialIcons = [], logo }) {
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
              <Grid item component="a" href="/">
                <img src={logo} alt="Logo" className="logo" />
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
              component="a"
              href="/terms"
            >
              Terms of Use
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              display="inline"
              variant="body1"
              component="a"
              href="/privacy"
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
  logo: T.string,
}

Footer.defaultProps = {
  classes: {},
  socialIcons: [],
  logo: '',
}

export default withStyles(styles, { withTheme: true })(Footer)
