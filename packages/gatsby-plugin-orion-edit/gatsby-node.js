exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  createPage({
    path: '/pages',
    matchPath: '/pages/:id',
    component: require.resolve('./src/templates/edit-page'),
  })

  return null
}
