import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { Grid, Paper, Typography, withStyles } from '@material-ui/core'
import { AuthContext, PaddedContainer, SectionTitle } from 'components'
import BackgroundImage from 'gatsby-background-image'
import { useTranslation } from 'react-i18next'
import Img from 'gatsby-image'

import AssessmentTool from '../components/AssessmentTool'
import AssessmentsTable from '../components/AssessmentsTable'
import SEO from '../components/SEO'

const assessmentColors = [
  theme => theme.palette.primary.light,
  theme => theme.palette.secondary.light,
  theme => theme.palette.primary.main,
]

function AssessmentsHome({ theme, classes, data }) {
  const {
    heroBanner,
    modelImage,
    assets: { nodes: assets },
    assessmentTypes: { nodes: assessmentTypes },
  } = data

  const { t } = useTranslation()
  const { getUserTokenData } = useContext(AuthContext)
  const { isAuthenticated } = getUserTokenData()
  const assessmentItems = assessmentTypes
    .map(type => ({
      ...type,
      logo: assets.find(asset => asset.name === type.logoAsset),
    }))
    .filter(type => type.orderIndex > 0 && type.logo)
    .sort((a, b) => a.orderIndex - b.orderIndex)

  return (
    <BackgroundImage
      className={classes.heroContainer}
      fluid={heroBanner.childImageSharp.fluid}
    >
      <SEO title="Assessment Home Page" />
      <div className={classes.header}>
        <PaddedContainer className={classes.heroDescription}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={12} sm={7}>
              <Grid container spacing={3} direction="column">
                <Grid item xs={6}>
                  <Typography variant="h1">
                    {t('Welcome to the DigitalEFQM Assess Base')}
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography>
                    {t(
                      'Welcome to the new home for Digital EFQM assessments. Here you will be able to find the tools to perform a self assessment. We offer three types of assessments which you can learn about below.'
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Img
                className={classes.modelContainer}
                fluid={modelImage.childImageSharp.fluid}
              />
            </Grid>
          </Grid>
        </PaddedContainer>
      </div>
      <PaddedContainer>
        <div className={classes.sectionTop}>
          {isAuthenticated && (
            <Paper>
              <AssessmentsTable />
            </Paper>
          )}
        </div>
        <div className={classes.sectionBottom}>
          <Grid container spacing={2} wrap="nowrap">
            <Grid item xs={3}>
              <SectionTitle barColor={theme.palette.primary.dark} noWrap>
                {t('Assessment Tools')}
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
    marginBottom: theme.spacing(5),
  },
  heroContainer: {
    backgroundSize: '100%',
    backgroundPosition: 'top left',
  },
  heroDescription: {
    marginTop: theme.spacing(1),
  },
  modelContainer: {
    marginTop: theme.spacing(4),
    maxHeight: '429px',
    maxWidth: '443px',
    left: theme.spacing(10),
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
  query HomeTemplateQuery(
    $heroImageName: String!
    $modelImageName: String!
    $assets: [String]!
  ) {
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
    modelImage: file(name: { eq: $modelImageName }) {
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
