require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

const themeName = 'efqm-theme'

const activeTheme = require(themeName)

const metadata = {
  'efqm-theme': {
    title: `EFQM Knowledgebase`,
    author: `EFQM`,
    description: `EFQM's Digital Knowledgebase.`,
    siteUrl: `https://www.knowledge-base.efqm.org`,
    social: {
      twitter: `EFQM`,
    },
    icon: `content/assets/efqmdigital-logomark.png`,
    shortName: `EFQM-KB`,
  },
  'nearform-theme': {
    title: `NearForm Knowledgebase`,
    author: `NearForm`,
    description: `NearForm's Open Source Knowledgebase.`,
    siteUrl: `https://neaform.github.io/knowledgebase`,
    social: {
      twitter: `nearform`,
    },
    icon: `content/assets/nearform-logo.png`,
    shortName: `NFKB`,
  }
}

const {
  title,
  author,
  description,
  siteUrl,
  social,
  shortName,
  icon
} = metadata[themeName]

module.exports = {
  siteMetadata: {
    title,
    author,
    description,
    siteUrl,
    social,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: title,
        short_name: shortName,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon,
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
    //     theme: activeTheme.muiTheme,
    //   },
    // },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: activeTheme.googleFonts,
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
