import React from 'react'
import { graphql } from 'gatsby'
import { Button, Grid, Typography, withStyles } from '@material-ui/core'
import { PaddedContainer } from 'components'
import BackgroundImage from 'gatsby-background-image'
import { Link as RouterLink } from '@reach/router'
import SEO from '../components/SEO'

function KnowledgeHome({ theme, classes, data }) {
  const { heroBanner } = data

  return (
    <BackgroundImage
      className={classes.heroContainer}
      fluid={heroBanner.childImageSharp.fluid}
    >
      <SEO title="Assessment Home Page" />
      <div className={classes.header}>
        <PaddedContainer className={classes.heroDescription}>
          <Grid container spacing={3} direction="column">
            <Grid item xs={4}>
              <Typography variant="h1">
                Gain knowledge from the world's leading organisations
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body2">
                EFQM pride themselves on their knowledge base. We want you our
                members to learn and improve and see how your company can reach
                excellence.
              </Typography>
            </Grid>

            <Grid item container spacing={3} direction="row">
              <Grid item>
                <Button color="secondary" variant="contained">
                  Explore the knowledge base
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="outlined"
                  component={RouterLink}
                  to={'/submit'}
                >
                  Submit to knowledge base
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </PaddedContainer>
      </div>
      <PaddedContainer>{/*Home Body*/}</PaddedContainer>
    </BackgroundImage>
  )
}

const styles = theme => ({
  header: {
    position: 'relative',
  },
  heroContainer: {
    backgroundSize: '100%',
    backgroundPosition: 'top left',
  },
  heroDescription: {
    marginTop: theme.spacing(13),
  },
  sectionTop: {
    marginTop: theme.spacing(2),
  },
  sectionBottom: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
})

export const query = graphql`
  query HomeTemplateQuery($heroImageName: String!) {
    site {
      siteMetadata {
        title
      }
    }
    heroBanner: file(name: { eq: $heroImageName }) {
      childImageSharp {
        fluid(quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default withStyles(styles, { withTheme: true })(KnowledgeHome)
