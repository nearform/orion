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
  },
  tertiary: {
    main: colorDefinitions.lightGrey,
  },
  background: {
    default: colorDefinitions.white,
    paper: colorDefinitions.white,
    dark: colorDefinitions.lighterGrey,
  },
}
