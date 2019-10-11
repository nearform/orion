const path = require('path')
const currentTheme = require('./theme')
// TODO: uncomment below when SSR is enabled
// const get = require('lodash/get')
// const zipWith = require('lodash/zipWith')
// const chunk = require('lodash/chunk')
// const getArticlesQuery = require('./queries/get-articles')
// const getUsersQuery = require('./queries/get-users')
// const getTaxonomiesQuery = require('./queries/get-taxonomies')
// const getArticlesByTaxonomyQuery = require('./queries/get-articles-by-taxonomy')
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
  // TODO: uncomment below when SSR is enabled
  // const ContentViewTemplate = require.resolve('./src/templates/ContentView.js')
  // const ProfileViewTemplate = require.resolve('./src/templates/ProfileView.js')
  // const ContentListViewTemplate = require.resolve(
  //   './src/templates/ContentListView.js'
  // )

  createPage({
    path: '/',
    component: homeTemplate,
    context: {
      heroImageName: config.heroImageNameKB,
    },
  })

  // TODO: uncomment below when SSR is enabled
  // const PAGE_SIZE = 10
  // const taxonomiesQueryResults = await graphql(getTaxonomiesQuery)

  // if (taxonomiesQueryResults.errors) {
  //   throw taxonomiesQueryResults.errors
  // }
  // const taxonomies = get(taxonomiesQueryResults, 'data.raw_salmon.taxonomy', [])

  // const articlesByTaxonomiesPromises = []
  // taxonomies.forEach(taxonomy =>
  //   articlesByTaxonomiesPromises.push(
  //     graphql(getArticlesByTaxonomyQuery, {
  //       taxonomy: taxonomy.key,
  //     })
  //   )
  // )

  // const articlesByTaxonomies = await Promise.all(articlesByTaxonomiesPromises)
  //   .then(response => response.map(data => data.data.raw_salmon))
  //   .then(data =>
  //     zipWith(data, taxonomies, (data, taxonomy) => ({
  //       ...data,
  //       taxonomy,
  //     }))
  //   )
  //   .catch(error => {
  //     throw error
  //   })

  // articlesByTaxonomies.forEach(results =>
  //   chunk(results.article, PAGE_SIZE).forEach((articles, index) => {
  //     createPage({
  //       path: `/section/${results.taxonomy.key}${
  //         index !== 0 ? `/page/${index + 1}` : ''
  //       }`,
  //       component: ContentListViewTemplate,
  //       context: {
  //         results: {
  //           ...results,
  //           article: articles,
  //         },
  //         page: index + 1,
  //       },
  //     })
  //   })
  // )

  // const articlesQueryResults = await graphql(getArticlesQuery)

  // if (articlesQueryResults.errors) {
  //   throw articlesQueryResults.errors
  // }
  // const publishedArticles = get(
  //   articlesQueryResults,
  //   'data.raw_salmon.article',
  //   []
  // )

  // publishedArticles.forEach(articleSummary => {
  //   createPage({
  //     path: `/content/${articleSummary.path}`,
  //     component: ContentViewTemplate,
  //     context: { articleSummary },
  //   })
  // })

  // const usersQueryResults = await graphql(getUsersQuery)

  // if (usersQueryResults.errors) {
  //   throw usersQueryResults.errors
  // }
  // const users = get(usersQueryResults, 'data.raw_salmon.user', [])

  // users.forEach(user => {
  //   createPage({
  //     path: `/profile/${user.id}`,
  //     component: ProfileViewTemplate,
  //     context: { user },
  //   })
  // })

  return null
}

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  const config = getConfig()
  config.module.rules.push({
    test: /\.graphql?$/,
    exclude: /node_modules/,
    loader: 'webpack-graphql-loader',
  })
  config.module.rules.push({
    test: /\.(png|jpg|gif)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  })
  /*
  Object.assign(config.resolve.alias, {
    react: path.resolve('./node_modules/react'),
    '@material-ui/core': path.resolve('./node_modules/@material-ui/core'),
  })
  */
  Object.assign(config.resolve.alias, {
    react: path.resolve('../../node_modules/react'),
    '@material-ui/core': path.resolve('../../node_modules/@material-ui/core'),
  })
  actions.replaceWebpackConfig(config)
}
