exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  createPage({
    path: '/',
    component: require.resolve('./src/templates/home'),
  })

  createPage({
    path: '/_admin',
    matchPath: '/admin',
    component: require.resolve('./src/templates/admin-page'),
  })

  return null
}
