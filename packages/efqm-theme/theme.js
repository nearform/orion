const fontFamily = (exports.fontFamily = 'Lato, sans-serif')

const typography = {
  h1: {
    fontFamily,
    fontWeight: '900',
    fontSize: 28,
    lineHeight: 1.29,
    letterSpacing: 0.5,
  },
  h2: {
    fontFamily,
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 'normal',
    letterSpacing: -0.1,
  },
  h3: {
    fontFamily,
    fontWeight: 'bold',
  },
  h4: {
    fontFamily,
    fontWeight: 'bold',
  },
  h5: {
    fontFamily,
    fontWeight: 'bold',
    fontSize: 11,
    // from zeplin style guide but disabled temporarily
    // lineHeight: 'normal',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  h6: {
    fontFamily,
    fontWeight: '900',
    fontSize: 12,
    // from zeplin style guide but disabled temporarily
    // lineHeight: 'normal',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  body1: {
    fontFamily,
    fontSize: 16,
    // from zeplin style guide but disabled temporarily
    // lineHeight: 1.31,
    letterSpacing: 'normal',
  },
  body2: {
    fontFamily,
    fontSize: 14,
    // from zeplin style guide but disabled temporarily
    // lineHeight: 0.86,
    letterSpacing: 'normal',
  },
  placeholder: {
    fontFamily,
    fontSize: 14,
    lineHeight: 'normal',
    letterSpacing: -0.1,
  },
  button: {
    fontFamily,
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 'normal',
    letterSpacing: 1.8,
  },
}

const efqmDigitalPalette = {
  // Names / keys are unofficial descriptions
  slateGrey: 'rgb(69, 75, 102)',
  navyBlue: 'rgb(73, 98, 173)',
  cyan: 'rgb(80, 184, 242)',
  aqua: 'rgb(121, 204, 198)',
  emeraldGreen: 'rgb(112, 214, 112)',
  pearGreen: 'rgb(155, 220, 106)',

  // Shades used in designs not included in EFQM docs
  midGrey: 'rgb(152, 175, 198)',
  paleGrey: 'rgb(244, 246, 248)',
}

exports.muiTheme = {
  overrides: {
    MuiButton: {
      root: {
        whiteSpace: 'nowrap',
        boxShadow:
          '0 0 5px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.1)',
      },
      text: {
        boxShadow: 'none',
      },
    },
    MuiInput: {
      root: {
        borderRadius: 3,
        padding: '0 5px',
        backgroundColor: efqmDigitalPalette.paleGrey,
      },
    },
  },
  props: {
    MuiInput: {
      disableUnderline: true,
    },
  },
  typography: {
    useNextVariants: 'true',
    fontFamily,
    fontWeight: 'normal',
    ...typography,
  },
  palette: {
    // These roles will be refined as designs are updated
    primary: {
      main: efqmDigitalPalette.navyBlue,
      light: efqmDigitalPalette.cyan,
      dark: efqmDigitalPalette.slateGrey,
    },
    secondary: {
      main: efqmDigitalPalette.aqua,
      light: efqmDigitalPalette.pearGreen, // Higher luminosity, brighter
      dark: efqmDigitalPalette.emeraldGreen, // Stronger, more saturated
    },
    background: {
      default: '#fff',
      paper: efqmDigitalPalette.paleGrey,
    },
    custom: {
      sliderTick: efqmDigitalPalette.midGrey,
    },
  },
}

exports.googleFonts = ['Lato']
