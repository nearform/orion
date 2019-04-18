const fontFamily = (exports.fontFamily = 'Lato, sans-serif')

// Placeholder until we have complete typography guidelines
const headings = {
  h1: {
    fontFamily,
    fontWeight: '900',
  },
  h2: {
    fontFamily,
    fontWeight: '900',
  },
  h3: {
    fontFamily,
    fontWeight: '700',
  },
  h4: {
    fontFamily,
    fontWeight: '500',
  },
  h5: {
    fontFamily,
    fontWeight: '700',
  },
  h6: {
    fontFamily,
    fontWeight: '500',
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
    fontWeight: 'light',
    ...headings,
    button: {
      fontSize: 12,
      letterSpacing: 2.5,
      fontWeight: '600',
    },
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
  },
}

exports.googleFonts = ['Lato']
