import React from 'react'
import {
  withStyles,
  Grid,
  Typography,
  Button,
  TextField,
} from '@material-ui/core'
import { PaddedContainer } from 'components'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'

function Footer({ classes, theme }) {
  const {
    site: {
      siteMetadata: { author, social },
    },
    socialIcons,
    largeLogo: {
      childImageSharp: { fixed: logoFixed },
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
      socialIcons: allFile(
        filter: {
          extension: { in: ["png", "svg", "jpg", "gif"] }
          relativeDirectory: { eq: "social" }
          sourceInstanceName: { in: ["theme-assets", "app-assets"] }
        }
      ) {
        edges {
          node {
            name
            childImageSharp {
              fixed(width: 28) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
      site {
        siteMetadata {
          author
          social
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
  grow: {
    flexGrow: 1,
  },
})

export default withStyles(styles, { withTheme: true })(Footer)
