const path = require('path')

module.exports = async ({ config }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    fs: path.resolve(__dirname, 'fsMock.js'),
  }

  config.module.rules.push({
    test: /\.graphql?$/,
    exclude: /node_modules/,
    loader: 'webpack-graphql-loader',
  })

  return config
}
