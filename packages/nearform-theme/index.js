const bodyFontFamily = (exports.bodyFontFamily = 'Didact Gothic, sans-serif')
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
  typography: {
    useNextVariants: 'true',
    fontFamily: bodyFontFamily,
    ...headings,
  },
  palette: {
    primary: { main: nearformPalette.blue },
    secondary: { main: nearformPalette.supersplit },
  },
}

exports.googleFonts = ['Didact Gothic', 'Poppins']
