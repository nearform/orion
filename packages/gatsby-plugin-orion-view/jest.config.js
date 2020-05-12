module.exports = {
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest-preprocess.js',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.cache/'],
  setupFilesAfterEnv: [`./setup-tests.js`],
}
