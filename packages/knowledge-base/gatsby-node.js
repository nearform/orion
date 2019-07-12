const path = require('path')
const currentTheme = require('./theme')

const { config } = currentTheme

exports.onPreInit = () => {
  //add validations!
  // const logger = console
  // try {
  //   const { validateAssessmentFiles } = require('./src/validations')
  //   validateAssessmentFiles(currentTheme, logger)
  // } catch (e) {
  //   // useful to catch and show because gatsby might swallow the error and break in next processing
  //   // parts so it would be hard to trace the error to here
  //   logger.error(e)
  //   throw e
  // }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const homeTemplate = require.resolve('./src/templates/home.js')
  // const articlesQueryResults = await graphql(`
  //   {
  //     allArticles {
  //       totalCount
  //     }
  //   }
  // `)

  // if (articlesQueryResults.errors) {
  //   throw articlesQueryResults.errors
  // }

  createPage({
    path: '/',
    component: homeTemplate,
    context: {
      heroImageName: config.heroImageNameKB,
    },
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
