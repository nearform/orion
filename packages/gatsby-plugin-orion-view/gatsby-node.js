const get = require('lodash/get')
const getArticlesQuery = require('./queries/get-articles')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const articleResults = await graphql(getArticlesQuery)

  if (articleResults.errors) {
    throw articleResults.errors
  }

  const publishedArticles = get(articleResults, 'data.orion.orion_content', [])

  createPage({
    path: '/',
    matchPath: '/',
    component: require.resolve('./src/templates/home.js'),
    context: {
      articles: publishedArticles,
    },
  })

  publishedArticles.forEach(article => {
    createPage({
      path: article.path,
      matchPath: article.path,
      component: require.resolve('./src/templates/article.js'),
      context: {
        article,
      },
    })
  })

  return null
}
