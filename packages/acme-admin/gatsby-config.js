require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

module.exports = {
  plugins: ['gatsby-plugin-orion-admin'],
}
