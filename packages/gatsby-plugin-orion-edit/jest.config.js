module.exports = {
  globalSetup: './global-setup.js',
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest-preprocess.js',
  },
  setupFilesAfterEnv: [`./setup-tests.js`],
}
