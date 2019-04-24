const fontFamily = (exports.fontFamily = 'Didact Gothic, sans-serif')
const headingFontFamily = 'Poppins, sans-serif'

const headings = new Array(6)
  .fill(null)
  .map((_, i) => i + 1)
  .reduce(
    (acc, c) => ({
      ...acc,
      [`h${c}`]: {
        fontFamily: headingFontFamily,
        fontWeight: 'bold',
      },
    }),
    {}
  )

const nearformPalette = {
  blue: '#2165e5',
  midnightBlue: '#194cac',
  sand4: '#6d6d68',
  sand3: '#908a8a',
  sand2: '#a8a4a3',
  sand1: '#f4f4f2',
  supersplit: '#fd775e',
  brunchPink: '#fd7a9e',
  bubblegum: '#f9c3c0',
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
        backgroundColor: nearformPalette.sand2,
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
    fontFamily: fontFamily,
    ...headings,
    button: {
      letterSpacing: 2,
      fontWeight: '600',
    },
  },
  palette: {
    primary: { main: nearformPalette.blue },
    secondary: { main: nearformPalette.supersplit },
    background: {
      default: '#fff',
      paper: nearformPalette.sand1,
      dark: nearformPalette.sand3,
    },
  },
}

exports.googleFonts = ['Didact Gothic', 'Poppins']
