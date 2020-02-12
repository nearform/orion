module.exports = {
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest-preprocess.js',
  },
  transformIgnorePatterns: ['node_modules/(?!(material-ui-nested-menu-item)/)'],
  setupFilesAfterEnv: [`./setup-tests.js`],
  // Something weird about this package, we have to tell jest where to find the index.js
  moduleNameMapper: {
    'material-ui-nested-menu-item': 'material-ui-nested-menu-item/dist-web',
  },
}
