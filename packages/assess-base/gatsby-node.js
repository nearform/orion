const path = require('path')
const currentTheme = require('./theme')

const { theme, config } = currentTheme

const pillarColors = [
  theme.muiTheme.palette.primary.light,
  theme.muiTheme.palette.primary.main,
  theme.muiTheme.palette.secondary.dark,
]

const {
  getAssessmentTypes,
} = require('efqm-theme/assessments/getAssessmentParts')

exports.onPreInit = () => {
  const logger = console
  try {
    const { validateAssessmentFiles } = require('./src/validations')
    validateAssessmentFiles(currentTheme, logger)
  } catch (e) {
    // useful to catch and show because gatsby might swallow the error and break
    // in next processing parts so it would be hard to trace the error to here
    logger.error(e)
    throw e
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const homeTemplate = require.resolve('./src/templates/home.js')
  const assessmentTemplate = require.resolve('./src/templates/assessment.js')
  const questionnaireTemplate = require.resolve(
    './src/templates/questionnaire.js'
  )
  const questionnaireScoringTemplate = require.resolve(
    './src/templates/questionnaire-scoring.js'
  )
  const questionnaireFeedbackReportTemplate = require.resolve(
    './src/templates/questionnaire-feedback-report.js'
  )
  const criterionTemplate = require.resolve('./src/templates/criterion.js')
  const criterionPartTemplate = require.resolve(
    './src/templates/criterion-part.js'
  )
  const feedbackReportTemplate = require.resolve(
    './src/templates/feedback-report.js'
  )
  const managementReportTemplate = require.resolve(
    './src/templates/management-report.js'
  )
  const contributorsAssessorsTemplate = require.resolve(
    './src/templates/contributors-assessors.js'
  )
  const profileTemplate = require.resolve('./src/templates/profile.js')

  const translationOptions = Object.keys(config.translations)
  const modelImageAssets = translationOptions.map(
    abb => `${config.modelImageAB}_${abb}`
  )

  const assessments = getAssessmentTypes()
  const homepageAssets = assessments.map(({ logoAsset }) => logoAsset)

  createPage({
    path: '/',
    component: homeTemplate,
    context: {
      heroImageName: config.heroImageNameAB,
      modelImageName: config.modelImageAB,
      modelImageAssets: modelImageAssets,
      assets: homepageAssets,
    },
  })

  assessments.forEach(assessment => {
    const { key } = assessment
    switch (key) {
      case 'efqm-2020':
      case 'efqm-2020-advanced':
        makeBusinessMatrixPages(assessment)
        break
      case 'questionnaire':
        makeQuestionnairePages(assessment)
        break
    }
  })

  function makeBusinessMatrixPages(assessment) {
    const createCriterionPagePath = (pillar, criterion) =>
      `/assessment/${assessment.key}/${pillar.key}/${criterion.key}`

    const criteriaList = assessment.pillars.reduce(
      (acc, pillar, pillarIndex) => {
        const { key: pillarKey } = pillar
        const pillarCriteria = pillar.criteria.map(criterion => {
          return criterion.parts.map((part, idx) => {
            const {
              tables: [{ key: criterionKey, name }],
            } = part
            const path = createCriterionPagePath(pillar, criterion) + '/' + idx
            return {
              key: JSON.stringify({
                pillarKey,
                criterionKey,
              }),
              name,
              path,
              matchPath: path,
            }
          })
        })
        return [...acc, ...pillarCriteria]
      },
      []
    )

    createPage({
      path: `/assessment/${assessment.key}`,
      matchPath: `/assessment/${assessment.key}`,
      component: assessmentTemplate,
      context: {
        assessment,
        pillarColors,
      },
    })

    createPage({
      path: `/assessment/${assessment.key}/feedback-report`,
      matchPath: `/assessment/${assessment.key}/feedback-report`,
      component: feedbackReportTemplate,
      context: {
        assessment,
        pillarColors,
      },
    })

    createPage({
      path: `/assessment/${assessment.key}/management-report`,
      matchPath: `/assessment/${assessment.key}/management-report`,
      component: managementReportTemplate,
      context: {
        assessment,
        pillarColors,
      },
    })

    createPage({
      path: `/assessment/${assessment.key}/contributors-assessors`,
      matchPath: `/assessment/${assessment.key}/contributors-assessors`,
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
          if (assessment.key === 'efqm-2020' && partIndex > 0) return
          const isFirst = partIndex === 0
          const isLast = partIndex === totalParts - 1
          const partNumber = partIndex + 1
          const previousLink = isFirst
            ? criterionPagePath
            : createCriterionPartLink(partNumber - 1)
          const nextLink = isLast
            ? `/assessment/${assessment.key}`
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
              pillarColors,
              previousLink,
              nextLink,
              totalParts,
              criteriaList,
            },
          })
        })
      })
    })
  }

  function makeQuestionnairePages(assessment) {
    const createCriterionPagePath = (pillar, criterion) =>
      `/assessment/${assessment.key}/${pillar.key}/${criterion.key}`

    const criteriaList = assessment.pillars.reduce(
      (acc, pillar, pillarIndex) => {
        const { key: pillarKey } = pillar
        const pillarCriteria = pillar.criteria.map(criterion => {
          return criterion.parts.map((part, idx) => {
            const {
              tables: [{ key: criterionKey, name }],
            } = part
            const path = createCriterionPagePath(pillar, criterion) + '/' + idx
            return {
              key: JSON.stringify({
                pillarKey,
                criterionKey,
              }),
              name,
              path,
              matchPath: path,
            }
          })
        })
        return [...acc, ...pillarCriteria]
      },
      []
    )

    createPage({
      path: `/assessment/${assessment.key}`,
      matchPath: `/assessment/${assessment.key}`,
      component: questionnaireTemplate,
      context: {
        assessment,
        pillarColors,
      },
    })

    createPage({
      path: `/assessment/${assessment.key}/feedback-report`,
      matchPath: `/assessment/${assessment.key}/feedback-report`,
      component: questionnaireFeedbackReportTemplate,
      context: {
        assessment,
        pillarColors,
      },
    })

    createPage({
      path: `/assessment/${assessment.key}/contributors-assessors`,
      matchPath: `/assessment/${assessment.key}/contributors-assessors`,
      component: contributorsAssessorsTemplate,
      context: {
        assessment,
      },
    })

    assessment.pillars.forEach((pillar, pillarIndex) => {
      const pillarColor = pillarColors[pillarIndex]

      pillar.criteria.forEach(criterion => {
        const questionnaireScoringPagePath = createCriterionPagePath(
          pillar,
          criterion
        )

        createPage({
          path: questionnaireScoringPagePath,
          component: questionnaireScoringTemplate,
          context: {
            assessment,
            pillar,
            part: criterion.parts[0],
            criterion,
            pillarColor,
            pillarColors,
            partNumber: 1,
            criteriaList,
          },
        })
      })
    })
  }

  const usersQueryResults = await graphql(`
    {
      raw_salmon {
        user {
          id
          first_name
          last_name
          email
          signupRequest
          avatar
          biography
          linkedin
          website
          twitter
          title
          consent_contact
          consent_directory
          user_roles {
            role {
              name
            }
          }
        }
      }
    }
  `)

  if (usersQueryResults.errors) {
    throw usersQueryResults.errors
  }
  usersQueryResults.data.raw_salmon.user.forEach(user => {
    const path = `/profile/${user.id}`
    createPage({
      path,
      matchPath: path,
      component: profileTemplate,
      context: { user },
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
  // Load react and material-ui from hoisted location under repo root.
  Object.assign(config.resolve.alias, {
    react: path.resolve('../../node_modules/react'),
    '@material-ui/core': path.resolve('../../node_modules/@material-ui/core'),
  })
  actions.replaceWebpackConfig(config)
}
