require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

const path = require('path')

const currentTheme = require('./theme')

const themeRootPath = path.dirname(require.resolve(currentTheme.THEME_NAME))

const themeAssetsPath = path.join(themeRootPath, currentTheme.config.assetsPath)
const themeAssessmentsPath = path.join(
  themeRootPath,
  currentTheme.config.assessmentsPath
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
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'theme-assessments',
        path: themeAssessmentsPath,
      },
    },
    {
      resolve: 'gatsby-transformer-json',
      options: { typeName: 'Assessments' },
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
