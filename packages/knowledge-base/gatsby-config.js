const path = require('path')
const currentTheme = require('gatsby-plugin-orion-core/theme')
const { version } = require('./package.json')
const { getApplicationVersion } = require('./utils/version')
const { getThemePaths } = require('./utils/paths')
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
      path: './assets',
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
  'gatsby-plugin-orion-admin',
  'gatsby-plugin-orion-edit',
  'gatsby-plugin-orion-view',
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
