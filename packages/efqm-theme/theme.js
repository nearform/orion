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
    // Mainly used for bold numbers in tables and graphics
    fontFamily,
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 1.4,
    letterSpacing: -0.2,
  },
  body2: {
    fontFamily,
    fontSize: 14,
    letterSpacing: 'normal',
  },
  body1: {
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
  paleGrey: 'rgb(244, 246, 248)',
  midGrey: 'rgb(152, 175, 198)',
  white: '#fff',
  black: '#000',
}

const shadows = [
  'none',
  // material ui requires  25 elevations
  ...new Array(24).fill(
    '0 0 5px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.1)'
  ),
]

exports.muiTheme = {
  overrides: {
    MuiButton: {
      root: {
        whiteSpace: 'nowrap',
        boxShadow: shadows[1],
      },
      text: {
        boxShadow: 'none',
      },
      contained: {
        padding: '9px 24px 8px',
      },
      outlinedPrimary: {
        border: 'none',
        '&:hover': {
          border: 'none',
        },
      },
      outlinedSecondary: {
        border: 'none',
        '&:hover': {
          border: 'none',
        },
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
        ...typography.body1,
        borderRadius: 3,
        backgroundColor: efqmDigitalPalette.paleGrey,
      },
      input: {
        padding: '7.5px 12px 8.5px',
      },
    },
    MuiOutlinedInput: {
      root: {
        ...typography.body1,
        borderRadius: 3,
        boxShadow: shadows[1],
        background: efqmDigitalPalette.white,
      },
      notchedOutline: {
        border: 'none',
      },
      input: {
        padding: '7.5px 12px 8.5px',
      },
    },
    MuiTypography: {
      gutterBottom: {
        marginBottom: '.75em',
      },
    },
    MuiTableCell: {
      head: {
        ...typography.h4,
      },
      body: {
        ...typography.body1,
      },
    },
  },
  props: {
    MuiInput: {
      disableUnderline: true,
    },
    MuiPaper: {
      elevation: 1,
    },
  },
  typography: {
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
      paper: efqmDigitalPalette.white,
      light: efqmDigitalPalette.paleGrey,
      dark: efqmDigitalPalette.midGrey,
    },
    contrastThreshold: 1.6,
  },
  shadows,
}

exports.googleFonts = ['Lato:400,700,900']
