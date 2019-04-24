const path = require('path')
const slugify = require('slugify')

const { theme } = require('./theme')

const pillarColors = [
  theme.muiTheme.palette.primary.light,
  theme.muiTheme.palette.primary.main,
  theme.muiTheme.palette.secondary.dark,
]

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const assessmentTemplate = path.resolve('./src/templates/assessment.js')
  const criterionTemplate = path.resolve('./src/templates/criterion.js')
  const criterionPartTemplate = path.resolve(
    './src/templates/criterion-part.js'
  )

  const assessmentsQueryResults = await graphql(`
    {
      allAssessments {
        totalCount
        nodes {
          name
          pillars {
            name
            criteria {
              name
              parts {
                guidance
                tables {
                  name
                  columns {
                    name
                  }
                }
                scoring {
                  name
                  scores {
                    name
                    description
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  if (assessmentsQueryResults.errors) {
    throw assessmentsQueryResults.errors
  }

  const { nodes: assessments } = assessmentsQueryResults.data.allAssessments

  assessments.forEach(assessment => {
    const assessmentSlug = slugify(assessment.name)

    createPage({
      path: `assessment/${assessmentSlug}`,
      component: assessmentTemplate,
      context: {
        slug: assessmentSlug,
        assessment,
        pillarColors,
      },
    })

    assessment.pillars.forEach((pillar, pillarIndex) => {
      const pillarSlug = slugify(pillar.name)
      const pillarColor = pillarColors[pillarIndex]

      pillar.criteria.forEach(criterion => {
        const criterionSlug = slugify(criterion.name)

        createPage({
          path: `assessment/${assessmentSlug}/${pillarSlug}/${criterionSlug}`,
          component: criterionTemplate,
          context: {
            assessmentSlug,
            pillarSlug,
            slug: criterionSlug,
            assessment,
            pillar,
            criterion,
            pillarColor,
          },
        })

        const createCriterionPartLink = partNumber =>
          `assessment/${assessmentSlug}/${pillarSlug}/${criterionSlug}/${partNumber}`

        criterion.parts.forEach((part, partIndex, { length: totalParts }) => {
          const isFirst = partIndex === 0
          const isLast = partIndex === totalParts - 1
          const partNumber = partIndex + 1
          const previousLink =
            !isFirst && createCriterionPartLink(partNumber - 1)
          const nextLink = !isLast && createCriterionPartLink(partNumber + 1)

          createPage({
            path: `assessment/${assessmentSlug}/${pillarSlug}/${criterionSlug}/${partNumber}`,
            component: criterionPartTemplate,
            context: {
              assessmentSlug,
              pillarSlug,
              criterionSlug,
              partNumber,
              part,
              assessment,
              pillar,
              criterion,
              pillarColor,
              previousLink,
              nextLink,
              totalParts,
            },
          })
        })
      })
    })
  })

  return null
}

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  const config = getConfig()
  config.module.rules.push({
    test: /\.graphql?$/,
    exclude: /node_modules/,
    loader: 'webpack-graphql-loader',
  })
  actions.replaceWebpackConfig(config)
}
