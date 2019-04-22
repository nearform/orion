require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

const THEME_NAME = 'efqm-theme'

const path = require('path')
const currentTheme = require(THEME_NAME)

const themeAssetsPath = path.join(
  path.dirname(require.resolve(THEME_NAME)),
  currentTheme.config.assetsPath
)

module.exports = {
  siteMetadata: {
    ...currentTheme.metadata,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'theme-assets',
        path: themeAssetsPath,
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
      options: { prefixes: ['/admin/*', '/auth/*'] },
    },
    // include again once the plugin fixes hot-reloading
    // {
    //   resolve: 'gatsby-plugin-material-ui',
    //   options: {
    //     theme: activeTheme.muiTheme,
    //   },
    // },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: currentTheme.theme.googleFonts,
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Knowledgebase',
        fieldName: 'knowledgebase',
        url: process.env.GATSBY_GRAPHQL_API,
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
        },
      },
    },
  ],
}
