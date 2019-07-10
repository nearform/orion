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

  return {
    themeAssessmentsPath,
    themeAssetsPath,
    themeRootPath,
  }
}

module.exports = {
  getThemePaths,
}
