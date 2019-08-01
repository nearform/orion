require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})
const upperFirst = require('lodash/upperFirst')
const path = require('path')

const currentTheme = require('./theme')
const { getThemePaths } = require('./utils/paths')

const { version } = require('./package.json')
const { getApplicationVersion } = require('./utils/version')

const {
  themeAssetsPath,
  themeAssessmentsPath,
  themeKnowledgeTypes,
} = getThemePaths(currentTheme)

module.exports = {
  siteMetadata: {
    ...currentTheme.metadata,
    version: getApplicationVersion(version),
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'theme-assets',
        path: themeAssetsPath,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'app-assets',
        path: './src/assets',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'theme-knowledge-types',
        path: themeKnowledgeTypes,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'theme-assessments',
        path: themeAssessmentsPath,
      },
    },
    {
      resolve: 'gatsby-transformer-json',
      options: {
        //uses the folder name to set the typename: qfqm-theme/articles => Articles
        typeName: ({ node }) => upperFirst(path.basename(node.dir)),
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: currentTheme.metadata.title,
        short_name: currentTheme.metadata.shortName,
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: path.join(themeAssetsPath, 'logo.png'),
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: {
        prefixes: [
          '/my-content/*',
          '/admin/*',
          '/auth/*',
          '/submit/*',
          '/content/*',
          '/search/*',
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
        typeName: 'RawSalmon',
        fieldName: 'raw_salmon',
        url: process.env.GATSBY_GRAPHQL_API,
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
        },
      },
    },
  ],
}
