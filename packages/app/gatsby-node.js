const path = require('path')

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
          key
          name
          pillars {
            key
            name
            criteria {
              key
              name
              parts {
                guidance
                tables {
                  key
                  name
                  columns {
                    key
                    name
                  }
                }
                scoring {
                  key
                  name
                  scores {
                    key
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
    createPage({
      path: `assessment/${assessment.key}`,
      component: assessmentTemplate,
      context: {
        assessment,
        pillarColors,
      },
    })

    assessment.pillars.forEach((pillar, pillarIndex) => {
      const pillarColor = pillarColors[pillarIndex]

      pillar.criteria.forEach(criterion => {
        createPage({
          path: `assessment/${assessment.key}/${pillar.key}/${criterion.key}`,
          component: criterionTemplate,
          context: {
            assessment,
            pillar,
            criterion,
            pillarColor,
          },
        })

        const createCriterionPartLink = partNumber =>
          `assessment/${assessment.key}/${pillar.key}/${
            criterion.key
          }/${partNumber}`

        criterion.parts.forEach((part, partIndex, { length: totalParts }) => {
          const isFirst = partIndex === 0
          const isLast = partIndex === totalParts - 1
          const partNumber = partIndex + 1
          const previousLink =
            !isFirst && createCriterionPartLink(partNumber - 1)
          const nextLink = !isLast && createCriterionPartLink(partNumber + 1)

          createPage({
            path: `assessment/${assessment.key}/${pillar.key}/${
              criterion.key
            }/${partNumber}`,
            component: criterionPartTemplate,
            context: {
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
