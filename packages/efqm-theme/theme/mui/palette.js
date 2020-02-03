const { colorDefinitions } = require('../variables')

module.exports = {
  primary: {
    main: colorDefinitions.navyBlue,
    light: colorDefinitions.cyan,
    dark: colorDefinitions.slateGrey,
  },
  secondary: {
    main: colorDefinitions.aqua,
    light: colorDefinitions.pearGreen,
    dark: colorDefinitions.emeraldGreen,
  },
  tertiary: {
    main: colorDefinitions.lightGrey,
    light: colorDefinitions.paleGrey,
    dark: colorDefinitions.midGrey,
  },
  background: {
    default: colorDefinitions.white,
    paper: colorDefinitions.white,
    light: colorDefinitions.paleGrey,
    dark: colorDefinitions.midGrey,
  },
  contrastThreshold: 1.6,
}
