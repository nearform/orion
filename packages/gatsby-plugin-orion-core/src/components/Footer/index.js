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
            <Typography gutterBottom variant="body2">
              <p className="greeting">Get in touch</p>
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
          <Grid container item xs={4}>
            <Grid item xs={12}>
              <a href="/" className="logo">
                <Img src={logo} />
              </a>
            </Grid>
            <Grid item xs={12} className="social-logos">
              {socialIcons.map(({ logo, url }) => (
                <a key={url} href={url} data-testid={url}>
                  <Img src={logo} />
                </a>
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
            <Typography display="inline" variant="body1">
              Terms of Use
            </Typography>
          </Grid>
          <Grid item>
            <Typography display="inline" variant="body1">
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
  Img: T.elementType,
  socialIcons: T.arrayOf(T.object),
  logo: T.string,
}

export default withStyles(styles, { withTheme: true })(Footer)
