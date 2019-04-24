const fontFamily = (exports.fontFamily = 'Lato, sans-serif')

const typography = {
  h1: {
    fontFamily,
    fontWeight: '900',
    fontSize: 28,
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
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  h4: {
    fontFamily,
    fontWeight: 'bold',
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  h5: {
    fontFamily,
    fontWeight: 'bold',
  },
  h6: {
    fontFamily,
    fontWeight: 'bold',
  },
  body1: {
    fontFamily,
    fontSize: 14,
    letterSpacing: 'normal',
  },
  body2: {
    fontFamily,
    fontSize: 16,
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
  white: '#fff',
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
      contained: {
        padding: '9px 24px 8px',
      },
      outlined: {
        padding: '8px 24px 7px',
      },
      sizeSmall: {
        fontSize: 11,
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
    primary: {
      main: efqmDigitalPalette.navyBlue,
      light: efqmDigitalPalette.cyan,
      dark: efqmDigitalPalette.slateGrey,
    },
    secondary: {
      main: efqmDigitalPalette.aqua,
      light: efqmDigitalPalette.pearGreen,
      dark: efqmDigitalPalette.emeraldGreen,
    },
    background: {
      default: efqmDigitalPalette.white,
      paper: efqmDigitalPalette.paleGrey,
    },
    custom: {
      sliderTick: efqmDigitalPalette.midGrey,
    },
    contrastThreshold: 1,
  },
}

exports.googleFonts = ['Lato']
