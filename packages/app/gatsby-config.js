require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

const nearformTheme = require('nearform-theme')

module.exports = {
  siteMetadata: {
    title: `NearForm Knowledgebase`,
    author: `NearForm`,
    description: `NearForm's Open Source Knowledgebase.`,
    siteUrl: `https://neaform.github.io/knowledgebase`,
    social: {
      twitter: `nearform`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `NearForm Knowledgebase`,
        short_name: `NFKB`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/nearform-logo.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/members/*`, '/admin/*'] },
    },
    // include again once the plugin fixes hot-reloading
    // {
    //   resolve: `gatsby-plugin-material-ui`,
    //   options: {
    //     theme: nearformTheme.muiTheme,
    //   },
    // },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: nearformTheme.googleFonts,
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
