const path = require('path')
const currentTheme = require('./theme')
const get = require('lodash/get')
const { config } = currentTheme

exports.onPreInit = () => {
  //add validations!
  // const logger = console
  // try {
  //   const { validateAssessmentFiles } = require('./src/validations')
  //   validateAssessmentFiles(currentTheme, logger)
  // } catch (e) {
  //   // useful to catch and show because gatsby might swallow the error and break in next processing
  //   // parts so it would be hard to trace the error to here
  //   logger.error(e)
  //   throw e
  // }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const homeTemplate = require.resolve('./src/templates/home.js')
  const ContentViewTemplate = require.resolve('./src/templates/ContentView.js')
  const ProfileViewTemplate = require.resolve('./src/templates/Profile.js')

  createPage({
    path: '/',
    component: homeTemplate,
    context: {
      heroImageName: config.heroImageNameKB,
    },
  })

  const articlesQueryResults = await graphql(`
    {
      raw_salmon {
        article(where: { status: { _eq: "published" } }) {
          primary_taxonomy: taxonomy_items(
            limit: 1
            order_by: { taxonomy: { taxonomy_type: { order_index: asc } } }
          ) {
            taxonomy {
              name
              key
            }
          }
          taxonomy_items {
            taxonomy_id
          }
          thumbnail
          title
          summary
          subtitle
          authors {
            author {
              first_name
              last_name
              title
              id
              email
            }
          }
          banner
          published_at
          path
          id
        }
      }
    }
  `)

  if (articlesQueryResults.errors) {
    throw articlesQueryResults.errors
  }
  const publishedArticles = get(
    articlesQueryResults,
    'data.raw_salmon.article',
    []
  )

  publishedArticles.forEach(articleSummary => {
    createPage({
      path: `/content/${articleSummary.path}`,
      component: ContentViewTemplate,
      context: { articleSummary },
    })
  })

  const usersQueryResults = await graphql(`
    {
      raw_salmon {
        user {
          id
          first_name
          last_name
          email
          signupRequest
          avatar
          biography
          linkedin
          website
          twitter
          title
          consent_contact
          consent_directory
          user_roles {
            role {
              name
            }
          }
        }
      }
    }
  `)

  if (usersQueryResults.errors) {
    throw usersQueryResults.errors
  }
  const users = get(usersQueryResults, 'data.raw_salmon.user', [])

  users.forEach(user => {
    createPage({
      path: `/profile/${user.id}`,
      component: ProfileViewTemplate,
      context: { user },
    })
  })

  return null
}

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  const config = getConfig()
  config.module.rules.push({
    test: /\.graphql?$/,
    exclude: /node_modules/,
    loader: 'webpack-graphql-loader',
  })
  Object.assign(config.resolve.alias, {
    react: path.resolve('./node_modules/react'),
    '@material-ui/core': path.resolve('./node_modules/@material-ui/core'),
  })
  actions.replaceWebpackConfig(config)
}
