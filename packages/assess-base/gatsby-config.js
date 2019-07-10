require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

const { version } = require('./package.json')
const {
  gatsbyConfig,
  version: { getApplicationVersion },
} = require('knowledge-base')

const gatsbyConfigClone = Object.assign({}, gatsbyConfig)

Object.assign(gatsbyConfigClone.siteMetadata, {
  version: getApplicationVersion(version),
  title: 'EFQM Assess Base',
})

// Allow local .env to override graphql url, e.g. for using local dev hasura
if (process.env.GATSBY_GRAPHQL_API) {
  const gatsbyGraphqlConfig = gatsbyConfigClone.plugins.find(
    plugin => plugin.resolve === 'gatsby-source-graphql'
  )

  gatsbyGraphqlConfig.options.url = process.env.GATSBY_GRAPHQL_API
  if (process.env.HASURA_GRAPHQL_ADMIN_SECRET) {
    gatsbyGraphqlConfig.options.headers['x-hasura-admin-secret'] =
      process.env.HASURA_GRAPHQL_ADMIN_SECRET
  }
}

module.exports = gatsbyConfigClone
