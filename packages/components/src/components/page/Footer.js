import React from 'react'
import T from 'prop-types'
import {
  withStyles,
  Grid,
  Typography,
  Button,
  TextField,
} from '@material-ui/core'
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

  return (
    <div className={classes.root}>
      <PaddedContainer>
        <Grid container spacing={3}>
          <Grid item xs>
            <Typography variant="h4" gutterBottom>
              Get in touch
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
              subscribe to our newsletter
            </Typography>
            <Typography gutterBottom variant="body2">
              The latest EFQM news, articles, and resources, sent straight to
              your inbox every month.
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
            <div className={classes.horizontalContainer}>
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
              <div className={classes.grow} />
              <Img fixed={logoFixed} />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={1} justify="center">
          <Grid item>
            <Typography display="inline" variant="body2">
              © EFQM
            </Typography>
          </Grid>
          <Grid item>
            <Typography display="inline" variant="body2">
              Terms of Use
            </Typography>
          </Grid>
          <Grid item>
            <Typography display="inline" variant="body2">
              Privacy Statement
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
  grow: {
    flexGrow: 1,
  },
})

Footer.propTypes = {
  classes: T.object,
  theme: T.object,
  content: T.object.isRequired,
  Img: T.elementType,
}

export default withStyles(styles, { withTheme: true })(Footer)
