require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

const upperFirst = require('lodash/upperFirst')
const path = require('path')
const currentTheme = require('./theme')

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-transformer-json',
      options: {
        // uses the folder name to set the typename: qfqm-theme/articles => Articles
        typeName: ({ node }) => upperFirst(path.basename(node.dir)),
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: {
        prefixes: [
          '/admin/*',
          '/auth/*',
          '/my-content/*',
          '/content/*',
          '/profile/*',
          '/section/*',
          '/search/*',
          '/submit/*',
          '/management-report/*',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-material-ui',
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: currentTheme.theme.googleFonts,
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Orion',
        fieldName: 'orion',
        url: process.env.GATSBY_GRAPHQL_API,
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
        },
      },
    },
  ],
}
