const get = require('lodash/get')

const getContentQuery = `{
  orion {
    orion_content(order_by: {date_published: asc}) {
      title
      summary
      subtitle
      date_created
      date_expired
      path
      id
      content
      content_type
      date_modified
      date_published
      hero_img
      parents
      status
    }
  }
}`

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const contentResults = await graphql(getContentQuery)

  if (contentResults.errors) {
    throw contentResults.errors
  }
  
  const publishedContent = get(
    contentResults,
    'data.orion.orion_content',
    []
  )

  publishedContent.forEach(content => {
    createPage({
      path: content.path,
      matchPath: content.path,
      component: require.resolve('./src/templates/content.js'),
      context: {
        content
      },
    })
  })

  return null
}
