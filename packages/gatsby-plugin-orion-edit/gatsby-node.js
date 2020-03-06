exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  createPage({
    path: '/_pages_edit',
    matchPath: '/pages/:id/edit',
    component: require.resolve('./src/templates/edit-page'),
  })

  createPage({
    path: '/_pages_create_root',
    matchPath: '/pages/create',
    component: require.resolve('./src/templates/create-root-page'),
  })

  createPage({
    path: '/_pages_create',
    matchPath: '/pages/:id/create',
    component: require.resolve('./src/templates/create-page'),
  })

  return null
}
