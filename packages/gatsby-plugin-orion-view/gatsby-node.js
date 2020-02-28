const getPagesQuery = require('./queries/get-pages')
const pageComponent = require.resolve('./src/components/Page')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const pagesResults = await graphql(getPagesQuery)

  if (pagesResults.errors) {
    throw pagesResults.errors
  }

  createPage({
    path: '/_not_found',
    matchPath: '/*',
    component: pageComponent || '',
    context: {
      page: null,
    },
  })

  pagesResults.data.orion.orion_page.forEach(page => {
    const pathSyntax = page.path[page.path.length - 1] === '/' ? '*' : '/*'
    const suffix = page.path === '/' ? '' : pathSyntax

    createPage({
      path: page.path,
      matchPath: `${page.path}${suffix}`,
      component: pageComponent,
      context: {
        page,
      },
    })
  })

  return null
}
