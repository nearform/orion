import React from 'react'
import T from 'prop-types'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import { Link } from '@reach/router'
import PaddedContainer from '../PaddedContainer'

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.background.default,
    paddingTop: '28px',
    '& .root': {
      paddingTop: '28px',
    },
    '& .MuiGrid-root': {
      '&:second-of-type': {
        marginBottom: '88px',
      },
      '& .social-logos': {
        '& > a': {
          display: 'block',
        },
      },
    },
    '& .logo': {
      display: 'block',
      width: 110,
    },
    '& .terms': {
      '& > .MuiGrid-root': {
        margin: '30px 8px 30px',
      },
      '& a': {
        color: theme.palette.background.default,
        textDecoration: 'none',
      },
    },
    '& .greeting': {
      fontWeight: 'bold',
    },
  },
}))

function Footer({ Img, socialIcons = [], Logo }) {
  const classes = useStyles()

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

Footer.propTypes = {
  Img: T.elementType.isRequired,
  socialIcons: T.arrayOf(T.object),
  Logo: T.elementType,
}

Footer.defaultProps = {
  socialIcons: [],
  Logo: undefined,
}

export default Footer
