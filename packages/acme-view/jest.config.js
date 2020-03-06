module.exports = {
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest-preprocess.js',
  },
  setupFilesAfterEnv: [`./setup-tests.js`],
  testPathIgnorePatterns: ['/node_modules/', '/.cache/'],
}
