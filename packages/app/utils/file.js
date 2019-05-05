const path = require('path')
const fs = require('fs')

function loadJSONFile(filePath) {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileContents)
}

function loadJSONFilesFromDir(dirPath) {
  return fs.readdirSync(dirPath).reduce((acc, filename) => {
    if (
      typeof filename === 'string' &&
      filename.toLowerCase().endsWith('.json')
    ) {
      acc[filename] = loadJSONFile(path.join(dirPath, filename))
    }
    return acc
  }, {})
}

module.exports = {
  loadJSONFilesFromDir,
}
