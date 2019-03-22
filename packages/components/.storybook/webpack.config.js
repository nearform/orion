const { join, resolve } = require('path')
const root = join(__dirname)

module.exports = ({ config }) => {

  config.resolve.alias['~'] = resolve(root, '../src/')

  return config
}

