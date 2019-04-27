import React from 'react'
import {
  withStyles,
  Grid,
  Typography,
  Button,
  TextField,
} from '@material-ui/core'
import Facebook from 'mdi-material-ui/Facebook'
import Youtube from 'mdi-material-ui/Youtube'
import Linkedin from 'mdi-material-ui/Linkedin'
import Twitter from 'mdi-material-ui/Twitter'
import { PaddedContainer } from 'components'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'

function Footer({ classes, theme }) {
  const {
    largeLogo: {
      childImageSharp: { fixed },
    },
  } = useStaticQuery(graphql`
    query {
      largeLogo: file(name: { eq: "large-logo" }) {
        childImageSharp {
          fixed(height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <div className={classes.root}>
      <PaddedContainer>
        <Grid container spacing={theme.spacing.unit * 3}>
          <Grid item xs>
            <Typography variant="h4" gutterBottom>
              Get in touch
            </Typography>
            <Typography component="div" variant="body1">
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
                >
                  info@efqm.org
                </a>
              </div>
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" gutterBottom>
              support
            </Typography>
            <Typography component="div" variant="body1">
              <div>Link 1</div>
              <div>Link 2</div>
              <div>Link 3</div>
              <div>Link 4</div>
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" gutterBottom>
              resources
            </Typography>
            <Typography component="div" variant="body1">
              <div>Link 1</div>
              <div>Link 2</div>
              <div>Link 3</div>
              <div>Link 4</div>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h4" gutterBottom>
              subscribe to our newsletter
            </Typography>
            <Typography gutterBottom variant="body1">
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
              <Facebook />
              <Youtube />
              <Twitter />
              <Linkedin />
              <Img fixed={fixed} />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={theme.spacing.unit} justify="center">
          <Grid item>
            <Typography inline variant="body1">
              © EFQM
            </Typography>
          </Grid>
          <Grid item>
            <Typography inline variant="body1">
              Terms of Use
            </Typography>
          </Grid>
          <Grid item>
            <Typography inline variant="body1">
              Privacy Statement
            </Typography>
          </Grid>
          <Grid item>
            <Typography inline variant="body1">
              Login
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
    paddingTop: theme.spacing.unit * 7,
    paddingBottom: theme.spacing.unit * 3,
  },
  horizontalContainer: {
    display: 'flex',
    margin: `${theme.spacing.unit * 2}px 0`,
    '& > * + *': {
      marginLeft: theme.spacing.unit * 2,
    },
    alignItems: 'flex-end',
  },
})

export default withStyles(styles, { withTheme: true })(Footer)
