require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})
const path = require('path')
const upperFirst = require('lodash/upperFirst')

const currentTheme = require('./theme')
const { getThemePaths } = require('./utils/paths')

const { version } = require('./package.json')
const { getApplicationVersion } = require('./utils/version')

const { themeAssetsPath, themeKnowledgeTypes } = getThemePaths(currentTheme)

const plugins = [
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
    resolve: 'gatsby-plugin-react-svg',
    options: {
      rule: {
        include: /assets/, // See below to configure properly
      },
    },
  },
  {
    resolve: 'gatsby-transformer-json',
    options: {
      // Uses the folder name to set the typename: qfqm-theme/articles => Articles
      typeName: ({ node }) => upperFirst(path.basename(node.dir)),
    },
  },
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      /* eslint-disable camelcase */
      name: currentTheme.metadata.title,
      short_name: currentTheme.metadata.shortName,
      start_url: '/',
      background_color: '#ffffff',
      theme_color: '#663399',
      display: 'minimal-ui',
      icon: path.join(themeAssetsPath, 'logo.png'),
      /* eslint-enable camelcase */
    },
  },
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
]

if (process.env.ANALYZE) {
  plugins.push({
    resolve: 'gatsby-plugin-webpack-bundle-analyzer',
    options: {
      production: true,
    },
  })
}

module.exports = {
  siteMetadata: {
    ...currentTheme.metadata,
    version: getApplicationVersion(version),
  },
  plugins,
}
