const path = require('path')
const currentTheme = require('./theme')

const { theme, config } = currentTheme

const pillarColors = [
  theme.muiTheme.palette.primary.light,
  theme.muiTheme.palette.primary.main,
  theme.muiTheme.palette.secondary.dark,
]

exports.onPreInit = () => {
  const logger = console
  try {
    const { validateAssessmentFiles } = require('./src/validations')
    validateAssessmentFiles(currentTheme, logger)
  } catch (e) {
    // useful to catch and show because gatsby might swallow the error and break in next processing
    // parts so it would be hard to trace the error to here
    logger.error(e)
    throw e
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const homeTemplate = require.resolve('./src/templates/home.js')
  const assessmentTemplate = require.resolve('./src/templates/assessment.js')
  const criterionTemplate = require.resolve('./src/templates/criterion.js')
  const criterionPartTemplate = require.resolve(
    './src/templates/criterion-part.js'
  )
  const feedbackReportTemplate = require.resolve(
    './src/templates/feedback-report.js'
  )
  const contributorsAssessorsTemplate = require.resolve(
    './src/templates/contributors-assessors.js'
  )

  const assessmentsQueryResults = await graphql(`
    {
      allAssessments {
        totalCount
        nodes {
          key
          name
          logoAsset
          guidance
          shortDescription
          keyInformation {
            guidance
            keyInformationItems {
              key
              name
            }
          }
          pillars {
            key
            name
            criteria {
              key
              name
              description
              parts {
                guidance
                tables {
                  key
                  name
                  guidance
                  columns {
                    key
                    name
                    type
                  }
                }
                feedbackTables {
                  key
                  columns {
                    key
                    name
                  }
                }
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
  `)

  if (assessmentsQueryResults.errors) {
    throw assessmentsQueryResults.errors
  }

  const { nodes: assessments } = assessmentsQueryResults.data.allAssessments
  const homepageAssets = assessments.map(({ logoAsset }) => logoAsset)

  createPage({
    path: '/',
    component: homeTemplate,
    context: {
      heroImageName: config.heroImageNameAB,
      assets: homepageAssets,
    },
  })

  assessments.forEach(assessment => {
    const createCriterionPagePath = (pillar, criterion) =>
      `assessment/${assessment.key}/${pillar.key}/${criterion.key}`

    const criteriaList = assessment.pillars.reduce(
      (acc, pillar, pillarIndex) => {
        const pillarCriteria = pillar.criteria.map(criterion => ({
          key: JSON.stringify({
            pillarKey: pillar.key,
            criterionKey: criterion.key,
          }),
          name: criterion.name,
          path: createCriterionPagePath(pillar, criterion),
        }))
        return [...acc, ...pillarCriteria]
      },
      []
    )

    createPage({
      path: `assessment/${assessment.key}`,
      component: assessmentTemplate,
      context: {
        assessment,
        pillarColors,
      },
    })

    createPage({
      path: `assessment/${assessment.key}/feedback-report`,
      component: feedbackReportTemplate,
      context: {
        assessment,
        pillarColors,
      },
    })

    createPage({
      path: `assessment/${assessment.key}/contributors-assessors`,
      component: contributorsAssessorsTemplate,
      context: {
        assessment,
      },
    })

    assessment.pillars.forEach((pillar, pillarIndex) => {
      const pillarColor = pillarColors[pillarIndex]

      pillar.criteria.forEach(criterion => {
        const criterionPagePath = createCriterionPagePath(pillar, criterion)

        createPage({
          path: criterionPagePath,
          component: criterionTemplate,
          context: {
            assessment,
            pillar,
            criterion,
            pillarColor,
          },
        })

        const createCriterionPartLink = partNumber =>
          `${criterionPagePath}/${partNumber}`

        criterion.parts.forEach((part, partIndex, { length: totalParts }) => {
          const isFirst = partIndex === 0
          const isLast = partIndex === totalParts - 1
          const partNumber = partIndex + 1
          const previousLink = isFirst
            ? null
            : createCriterionPartLink(partNumber - 1)
          const nextLink = isLast
            ? null
            : createCriterionPartLink(partNumber + 1)

          createPage({
            path: createCriterionPartLink(partNumber),
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
              criteriaList,
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
  Object.assign(config.resolve.alias, {
    react: path.resolve('./node_modules/react'),
    '@material-ui/core': path.resolve('./node_modules/@material-ui/core'),
  })
  actions.replaceWebpackConfig(config)
}