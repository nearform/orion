import BackgroundImage from 'gatsby-background-image'
import React from 'react'
import { Button, Grid, Typography, withStyles, Box } from '@material-ui/core'
import { Link as RouterLink } from '@reach/router'
import { PaddedContainer } from 'components'
import { graphql } from 'gatsby'

import EditorsPicks from '../components/list/EditorsPicks'
import PageSection from '../components/layout/page-section'
import PersonalizedLists from '../components/list/PersonalizedLists'
import SEO from '../components/SEO'
import column from '../components/layout/flex-with-gap/column'
import GainKnowledgeLinks from '../components/list/gain-knowledge-links'
import MostRecentArticles from '../components/list/most-recent-articles'
import EventList from '../components/list/event-list'
import row from '../components/layout/flex-with-gap/row'

function KnowledgeHome({ classes, data }) {
  const { heroBanner } = data

  return (
    <BackgroundImage
      className={classes.heroContainer}
      fluid={heroBanner.childImageSharp.fluid}
    >
      <SEO title="Knowledge Base Home Page" />
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
                <Button
                  color="secondary"
                  variant="outlined"
                  component={RouterLink}
                  to="/my-content/add"
                >
                  Submit to knowledge base
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </PaddedContainer>
      </div>
      <PageSection>
        <Box className={classes.primaryArticleLists}>
          <EditorsPicks />
          <PersonalizedLists />
        </Box>
      </PageSection>
      <PageSection
        className={classes.mostRecentAndEvents}
        paletteColor={['background', 'light']}
      >
        <MostRecentArticles className={classes.eventList} />
        <EventList className={classes.eventList} />
      </PageSection>
      <PageSection>
        <GainKnowledgeLinks />
      </PageSection>
    </BackgroundImage>
  )
}

const styles = theme => ({
  header: {
    paddingBottom: '140px',
    position: 'relative',
  },
  heroContainer: {
    backgroundSize: '100%',
    backgroundPosition: 'top left',
  },
  heroDescription: {
    marginTop: theme.spacing(13),
  },
  primaryArticleLists: column(theme)(6),
  mostRecentAndEvents: row(theme)(5),
  eventList: {
    flexBasis: '35%',
    flexShrink: 0,
    minWidth: 0,
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
