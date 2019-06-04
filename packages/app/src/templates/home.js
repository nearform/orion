import React from 'react'
import { graphql } from 'gatsby'
import { Button, Grid, Paper, Typography, withStyles } from '@material-ui/core'
import { PaddedContainer } from 'components'
import BackgroundImage from 'gatsby-background-image'

import LoggedOutAssessmentInfo from '../components/LoggedOutAssessmentInfo'
import SEO from '../components/SEO'
import SectionTitle from '../components/SectionTitle'
import AssessmentTool from '../components/AssessmentTool'
import AssessmentsTable from '../components/AssessmentsTable'
import { useIsAuthenticated } from '../utils/auth'

const assessmentColors = [
  theme => theme.palette.primary.light,
  theme => theme.palette.secondary.light,
  theme => theme.palette.primary.main,
]

function AssessmentsHome({ theme, classes, data }) {
  const {
    heroBanner,
    assets: { nodes: assets },
    assessmentTypes: { nodes: assessmentTypes },
  } = data

  const isAuthenticated = useIsAuthenticated()

  const assessmentItems = assessmentTypes
    .map(type => ({
      ...type,
      logo: assets.find(asset => asset.name === type.logoAsset),
    }))
    .sort((a, b) => a.orderIndex - b.orderIndex)

  return (
    <BackgroundImage
      className={classes.heroContainer}
      fluid={heroBanner.childImageSharp.fluid}
    >
      <SEO title="Assessment Home Page" />
      <div className={classes.header}>
        <PaddedContainer className={classes.heroDescription}>
          <Grid container spacing={theme.spacing.unit * 3} direction="column">
            <Grid item xs={4}>
              <Typography variant="h1">
                Welcome to the DigitalEFQM Assess Base
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography>
                Welcome to the new home for Digital EFQM assessments. Here you
                will be able to find the tools to perform a self assessment. We
                offer three types of assessments which you can learn about
                below.
              </Typography>
            </Grid>
            <Grid item>
              <Button color="secondary">Find out more</Button>
            </Grid>
          </Grid>
        </PaddedContainer>
      </div>
      <PaddedContainer>
        <div className={classes.sectionTop}>
          {isAuthenticated ? (
            <Paper>
              <AssessmentsTable />
            </Paper>
          ) : (
            <LoggedOutAssessmentInfo />
          )}
        </div>
        <div className={classes.sectionBottom}>
          <Grid container spacing={theme.spacing.unit * 2} wrap="nowrap">
            <Grid item xs={3}>
              <SectionTitle barColor={theme.palette.primary.dark} noWrap>
                Assessment Tools
              </SectionTitle>
            </Grid>
            {assessmentItems.map((item, index) => (
              <AssessmentTool
                key={`${item.name}_${index}`}
                assessmentToolMeta={item}
                barColor={assessmentColors[index % assessmentColors.length](
                  theme
                )}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </Grid>
        </div>
      </PaddedContainer>
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
    marginTop: theme.spacing.unit * 13,
  },
  sectionTop: {
    marginTop: theme.spacing.unit * 2,
  },
  sectionBottom: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
  },
})

export const query = graphql`
  query HomeTemplateQuery($heroImageName: String!, $assets: [String]!) {
    site {
      siteMetadata {
        title
      }
    }
    assessmentTypes: allAssessments {
      nodes {
        orderIndex
        name
        key
        logoAsset
        shortDescription
      }
    }
    heroBanner: file(name: { eq: $heroImageName }) {
      childImageSharp {
        fluid(quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    assets: allFile(filter: { name: { in: $assets } }) {
      nodes {
        name
        childImageSharp {
          fixed(width: 304, height: 100, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`

export default withStyles(styles, { withTheme: true })(AssessmentsHome)
