const get = require('lodash/get')
const getPagesQuery = require('./queries/get-pages')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const pagesResults = await graphql(getPagesQuery)

  if (pagesResults.errors) {
    throw pagesResults.errors
  }

  const publishedPages = get(pagesResults, 'data.orion.orion_page', [])

  publishedPages.forEach(page => {
    createPage({
      path: page.path,
      matchPath: page.path,
      component: require.resolve('./src/components/PageView'),
      context: {
        page: page,
      },
    })
  })

  return null
}
