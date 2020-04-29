const getPagesQuery = require('./queries/get-pages')
const getMenuQuery = require('./queries/get-menu-items')
const pageComponent = require.resolve('./src/components/Page')
const searchPageComponent = require.resolve('./src/components/SearchPage')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const menuResults = await graphql(getMenuQuery)
  const pagesResults = await graphql(getPagesQuery)

  if (pagesResults.errors) {
    throw pagesResults.errors
  }

  const menuParents = []
  menuResults.data.orion.orion_page.forEach(item => {
    const index = item.ancestry.length > 0 ? item.ancestry[0].ancestor_id : 0
    if (menuParents[index] === undefined) {
      menuParents[index] = []
    }

    menuParents[index].push(item)
  })

  const mapChildren = children => {
    return children.map(item =>
      menuParents[item.id] === undefined
        ? {
            label: item.title,
            to: item.path,
            children: [],
          }
        : {
            label: item.title,
            to: item.path,
            children: mapChildren(menuParents[item.id]),
          }
    )
  }

  const menu = mapChildren(menuParents[0])

  createPage({
    path: '/search',
    matchPath: '/search/*',
    component: searchPageComponent,
    context: {
      page: {
        ancestry: [],
        layout: 'section',
        contents: [
          {
            block: 'main',
            component: 'ArticleList',
            id: -1,
            props: {},
          },
        ],
      },
      menu,
    },
  })

  createPage({
    path: '/_not_found',
    matchPath: '/*',
    component: pageComponent,
    context: {
      page: {
        ancestry: [],
        is4xx: true,
        errorCode: 404,
        message: "We can't find the article you're looking for.",
        title: 'Not found.',
      },
      menu,
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
        menu,
      },
    })
  })

  return null
}
