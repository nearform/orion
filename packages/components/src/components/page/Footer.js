import React from 'react'
import T from 'prop-types'
import {
  withStyles,
  Grid,
  Typography,
  Button,
  TextField,
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import PaddedContainer from '../PaddedContainer'

function Footer({ classes, theme, content, Img }) {
  const {
    site: {
      siteMetadata: { author, social, version },
    },
    socialIcons,
    largeLogo: {
      childImageSharp: { fixed: logoFixed },
    },
  } = content
  const { t } = useTranslation()

  return (
    <div className={classes.root}>
      <PaddedContainer>
        <Grid container spacing={3}>
          <Grid item xs>
            <Typography variant="h4" gutterBottom>
              {t('Get in touch')}
            </Typography>
            <Typography component="div" variant="body2">
              <div>Avenue des Olympiades 2</div>
              <div>5th Floor</div>
              <div>B - 1140 Brussels, Belgium</div>
              <div>Tel: +322 755 3511</div>
              <div>
                Email:{' '}
                <a
                  href="mailto:info@efqm.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit' }}
                >
                  info@efqm.org
                </a>
              </div>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h4" gutterBottom>
              {t('subscribe to our newsletter')}
            </Typography>
            <Typography gutterBottom variant="body2">
              {t(
                'The latest EFQM news, articles, and resources, sent straight to your inbox every month.'
              )}
            </Typography>
            <div className={classes.horizontalContainer}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Your email address"
              />
              <Button color="secondary" variant="contained">
                subscribe
              </Button>
            </div>
          </Grid>
        </Grid>
        <div className={classes.socialAndLogo}>
          {social.map(([name, url]) => {
            const icon = socialIcons.edges.find(
              item => item.node.name.toLowerCase() === name.toLowerCase()
            )
            return (
              icon && (
                <a key={name} href={url} title={`${author} on ${name}`}>
                  <Img fixed={icon.node.childImageSharp.fixed} />
                </a>
              )
            )
          })}
          <Img fixed={logoFixed} />
        </div>
        <Grid container spacing={1} justify="center">
          <Grid item>
            <Typography display="inline" variant="body2">
              © EFQM
            </Typography>
          </Grid>
          <Grid item>
            <Typography display="inline" variant="body2">
              {t('Terms of Use')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography display="inline" variant="body2">
              {t('Privacy Statement')}
            </Typography>
          </Grid>
          <Grid item>
            <Typography display="inline" variant="body2">
              (version {version})
            </Typography>
          </Grid>
        </Grid>
      </PaddedContainer>
    </div>
  )
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.light,
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(3),
  },
  horizontalContainer: {
    display: 'flex',
    margin: theme.spacing(2, 0),
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    alignItems: 'flex-end',
  },
  socialAndLogo: {
    alignItems: 'flex-end',
    display: 'flex',
    margin: theme.spacing(0, 0, 2),
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    justifyContent: 'flex-end',
  },
})

Footer.propTypes = {
  classes: T.object,
  theme: T.object,
  content: T.object.isRequired,
  Img: T.elementType,
}

export default withStyles(styles, { withTheme: true })(Footer)
