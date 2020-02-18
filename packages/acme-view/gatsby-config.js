require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-orion-view',
      options: {},
    },
  ],
}
