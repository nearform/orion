const { colorDefinitions } = require('../variables')

module.exports = {
  primary: {
    main: colorDefinitions.purpleishBlue,
  },
  secondary: {
    main: colorDefinitions.darkSlateBlue,
  },
  action: {
    main: colorDefinitions.accessibleGreen,
    light: colorDefinitions.brighterGreen,
  },
  tertiary: {
    main: colorDefinitions.lightGrey,
  },
  background: {
    default: colorDefinitions.white,
    paper: colorDefinitions.white,
    dark: colorDefinitions.lighterGrey,
  },
  error: {
    main: colorDefinitions.error,
  },
}
