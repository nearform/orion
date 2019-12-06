const path = require('path')
const currentTheme = require('./theme')

const get = require('lodash/get')
const zipWith = require('lodash/zipWith')
const chunk = require('lodash/chunk')
const getArticlesQuery = require('./queries/get-articles')
const getUsersQuery = require('./queries/get-users')
const getTaxonomiesQuery = require('./queries/get-taxonomies')
const getArticlesByTaxonomyQuery = require('./queries/get-articles-by-taxonomy')
const { config } = currentTheme

exports.onPreInit = () => {
  require('../../node_modules/gatsby-core-utils').cpuCoreCount = () => {
    const coreCount = 2
    console.log('#### MONKEY PATCH cpuCoreCount=', coreCount)
    return coreCount
  }
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
  const contentTemplate = require.resolve('./src/templates/content.js')
  const profileTemplate = require.resolve('./src/templates/profile.js')
  const contentListTemplate = require.resolve('./src/templates/content-list.js')

  createPage({
    path: '/',
    matchPath: '/',
    component: homeTemplate,
    context: {
      heroImageName: config.heroImageNameKB,
    },
  })

  const PAGE_SIZE = 10
  const taxonomiesQueryResults = await graphql(getTaxonomiesQuery)

  if (taxonomiesQueryResults.errors) {
    throw taxonomiesQueryResults.errors
  }
  const taxonomies = get(taxonomiesQueryResults, 'data.raw_salmon.taxonomy', [])

  const articlesByTaxonomiesData = await Promise.all(
    taxonomies.map(async taxonomy => {
      const results = await graphql(getArticlesByTaxonomyQuery, {
        taxonomy: taxonomy.key,
      })
      return get(results, 'data.raw_salmon', [])
    })
  )
  const articlesByTaxonomies = zipWith(
    articlesByTaxonomiesData,
    taxonomies,
    (data, taxonomy) => ({
      ...data,
      taxonomy,
    })
  )

  articlesByTaxonomies.forEach(results => {
    if (!results.article.length) {
      const path = `/section/${results.taxonomy.key}`
      createPage({
        path,
        matchPath: path,
        component: contentListTemplate,
        context: {
          results: {
            ...results,
            article: [],
          },
          page: 1,
        },
      })
    }

    chunk(results.article, PAGE_SIZE).forEach((articles, index) => {
      const path = `/section/${results.taxonomy.key}${
        index !== 0 ? `/page/${index + 1}` : ''
      }`
      createPage({
        path,
        matchPath: path,
        component: contentListTemplate,
        context: {
          results: {
            ...results,
            article: articles,
          },
          page: index + 1,
        },
      })
    })
  })

  createPage({
    path: '/section/',
    matchPath: '/section/*',
    component: contentListTemplate,
    context: { results: {}, page: 1 },
  })

  const articlesQueryResults = await graphql(getArticlesQuery)

  if (articlesQueryResults.errors) {
    throw articlesQueryResults.errors
  }
  const publishedArticles = get(
    articlesQueryResults,
    'data.raw_salmon.article',
    []
  )
  publishedArticles.forEach(articleSummary => {
    const path = `/content/${articleSummary.path}`
    createPage({
      path,
      matchPath: path,
      component: contentTemplate,
      context: {
        articleSummary,
        banner: `https://s3.${process.env.GATSBY_AWS_REGION}.amazonaws.com/${process.env.GATSBY_AWS_S3_BUCKET}/public/${articleSummary.banner}`,
      },
    })
  })

  const usersQueryResults = await graphql(getUsersQuery)

  if (usersQueryResults.errors) {
    throw usersQueryResults.errors
  }
  const users = get(usersQueryResults, 'data.raw_salmon.user', [])
  users.forEach(user => {
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
  // Load react and material-ui from hoisted location under repo root.
  Object.assign(config.resolve.alias, {
    react: path.resolve('../../node_modules/react'),
    '@material-ui/core': path.resolve('../../node_modules/@material-ui/core'),
  })

  actions.replaceWebpackConfig(config)
}
