const path = require('path')

module.exports = async ({ config }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    fs: path.resolve(__dirname, 'fsMock.js'),
  }

  return config
}
