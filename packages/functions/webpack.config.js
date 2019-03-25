const fs = require('fs')

const functionNames = fs
  .readdirSync(__dirname, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .filter(dirent => !/node_modules|build/.test(dirent.name))
  .map(dirent => dirent.name)

const entries = functionNames.reduce(
  (acc, f) => ({ ...acc, [f]: `./${f}/index.js` }),
  {}
)

console.log(entries)

const functions = (module.exports = {
  entry: entries,
  target: 'node',
  output: {
    path: `${__dirname}/build`,
    filename: '[name].bundle.js',
    libraryTarget: 'umd',
  },
})
