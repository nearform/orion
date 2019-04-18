const path = require('path')
const slugify = require('slugify')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const articleTemplate = path.resolve(`./src/templates/article.js`)

  const articlesResult = await graphql(
    `
      {
        knowledgebase {
          article {
            id
            title
            description
            content
            published_at
            author {
              id
              name
            }
          }
        }
      }
    `
  )

  if (articlesResult.errors) {
    throw articlesResult.errors
  }

  const articles = articlesResult.data.knowledgebase.article

  articles.forEach((article, index) => {
    const previous = index === articles.length - 1 ? null : articles[index + 1]
    const next = index === 0 ? null : articles[index - 1]

    const slug = slugify(article.title)

    createPage({
      path: `${article.id}/${slug}`,
      component: articleTemplate,
      context: {
        slug,
        article,
        previous,
        next,
      },
    })
  })

  return null
}

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  const config = getConfig()
  config.module.rules.push(
    {
      test: /\.graphql?$/,
      exclude: /node_modules/,
      loader: 'webpack-graphql-loader'
    }
  )
  actions.replaceWebpackConfig(config)
}
