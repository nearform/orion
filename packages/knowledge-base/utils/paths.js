const path = require('path')

function getThemePaths(currentTheme) {
  const themeRootPath = path.dirname(require.resolve(currentTheme.THEME_NAME))

  const themeAssetsPath = path.join(
    themeRootPath,
    currentTheme.config.assetsPath
  )
  const themeAssessmentsPath = path.join(
    themeRootPath,
    currentTheme.config.assessmentsPath
  )
  const themeKnowledgeTypes = path.join(
    themeRootPath,
    currentTheme.config.knowledgeTypesPath
  )
  return {
    themeAssessmentsPath,
    themeKnowledgeTypes,
    themeAssetsPath,
    themeRootPath,
  }
}

module.exports = {
  getThemePaths,
}
