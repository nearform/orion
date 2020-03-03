require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

module.exports = {
  stories: ['../packages/**/*.stories.js'],
  addons: [
    'storybook-addon-jsx',
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    'storybook-addon-material-ui',
  ],
}
