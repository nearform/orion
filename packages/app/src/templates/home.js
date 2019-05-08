import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Button, Grid, Typography, withStyles } from '@material-ui/core'
import { PaddedContainer } from 'components'

import SEO from '../components/seo'
import SectionTitle from '../components/SectionTitle'
import ImagePlaceholder from '../components/ImagePlaceholder'
import AssessmentTool from '../components/AssessmentTool'

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

  const assessmentItems = assessmentTypes
    .map(type => ({
      ...type,
      logo: assets.find(asset => asset.name === type.logoAsset),
    }))
    .sort((a, b) => a.orderIndex - b.orderIndex)
  return (
    <>
      <SEO title="Assessment Home Page" />
      <div className={classes.header}>
        <Img fluid={heroBanner.childImageSharp.fluid} />
        <PaddedContainer className={classes.heroDescription}>
          <Grid container spacing={theme.spacing.unit * 4} direction="column">
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
            <Grid item xs={3}>
              <Button fullWidth color="secondary" variant="outlined">
                Read More
              </Button>
            </Grid>
          </Grid>
        </PaddedContainer>
      </div>
      <PaddedContainer>
        <div className={classes.sectionTop}>
          <Grid container spacing={theme.spacing.unit * 4}>
            <Grid item xs={3}>
              <SectionTitle barColor={theme.palette.primary.dark}>
                The EFQM Model 2020
              </SectionTitle>
            </Grid>
            <Grid item xs={5}>
              <ImagePlaceholder>
                <Typography variant="h4">Pic of Model 2020</Typography>
              </ImagePlaceholder>
            </Grid>
            <Grid item xs={4}>
              <Typography gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                interdum sapien et ipsum pellentesque, ut fringilla eros
                scelerisque. Mauris ex ex, viverra pharetra cursus gravida,
                vulputate ac velit. Donec nec tempus nulla. Curabitur
                scelerisque tincidunt diam a blandit. Nunc convallis, orci vitae
                dapibus luctus, tellus erat lacinia justo, et lacinia ipsum
                risus egestas arcu. Morbi quis consequat odio. Suspendisse at mi
                nunc. Vivamus tempor urna justo, vitae ullamcorper ex maximus
                quis.
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <Button color="secondary" variant="outlined" fullWidth>
                    Find Out More
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className={classes.sectionBottom}>
          <Grid container spacing={theme.spacing.unit * 4}>
            <Grid item xs={3}>
              <SectionTitle barColor={theme.palette.primary.dark}>
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
              />
            ))}
          </Grid>
        </div>
      </PaddedContainer>
    </>
  )
}

const styles = theme => ({
  header: {
    position: 'relative',
  },
  heroDescription: {
    position: 'absolute',
    left: 0,
    top: theme.spacing.unit * 13,
  },
  sectionTop: {
    marginTop: theme.spacing.unit * 16,
    marginBottom: theme.spacing.unit * 2,
  },
  sectionBottom: {
    marginBottom: theme.spacing.unit * 8,
  },
})

export const query = graphql`
  query HomeTemplateQuery($assets: [String]!) {
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
    heroBanner: file(name: { eq: "banner-hero@3x" }) {
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
