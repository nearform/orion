const currentTheme = require('gatsby-plugin-orion-core/theme')
const get = require('lodash/get')
const zipWith = require('lodash/zipWith')
const chunk = require('lodash/chunk')
const {
  getArticlesQuery,
  getUsersQuery,
  getTaxonomiesQuery,
  getArticlesByTaxonomyQuery,
} = require('gatsby-plugin-orion-core/queries')

const { config } = currentTheme

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

  createPage({
    path: '/admin/',
    matchPath: '/admin/*',
    component: require.resolve('./src/pages/admin.js'),
  })

  createPage({
    path: '/auth/',
    matchPath: '/auth/*',
    component: require.resolve('./src/pages/auth.js'),
  })

  createPage({
    path: '/content/',
    matchPath: '/content/*',
    component: require.resolve('./src/pages/content.js'),
  })

  createPage({
    path: '/my-content/',
    matchPath: '/my-content/*',
    component: require.resolve('./src/pages/my-content.js'),
  })

  createPage({
    path: '/search/',
    matchPath: '/search/*',
    component: require.resolve('./src/pages/search.js'),
  })

  const PAGE_SIZE = 10
  const taxonomiesQueryResults = await graphql(getTaxonomiesQuery)

  if (taxonomiesQueryResults.errors) {
    throw taxonomiesQueryResults.errors
  }

  const taxonomies = get(taxonomiesQueryResults, 'data.orion.taxonomy', [])

  const articlesByTaxonomiesData = await Promise.all(
    taxonomies.map(async taxonomy => {
      const results = await graphql(getArticlesByTaxonomyQuery, {
        taxonomy: taxonomy.key,
      })
      return get(results, 'data.orion', [])
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
    if (results.article.length === 0) {
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
        index === 0 ? '' : `/page/${index + 1}`
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

  const publishedArticles = get(articlesQueryResults, 'data.orion.article', [])
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

  const users = get(usersQueryResults, 'data.orion.user', [])
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
