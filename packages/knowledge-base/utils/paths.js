const path = require('path')

function getThemePaths(currentTheme) {
  const themeRootPath = path.dirname(require.resolve(currentTheme.THEME_NAME))

  const themeAssetsPath = path.join(
    themeRootPath,
    currentTheme.config.assetsPath
  )
  const themeKnowledgeTypes = path.join(
    themeRootPath,
    currentTheme.config.knowledgeTypesPath
  )
  return {
    themeKnowledgeTypes,
    themeAssetsPath,
    themeRootPath,
  }
}

module.exports = {
  getThemePaths,
}
