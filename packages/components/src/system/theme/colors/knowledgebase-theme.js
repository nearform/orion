const palette = {
  white: '#fff',
  blue: '#2165e5',
  midnightBlue: '#194cac',
  sand4: '#6d6d68',
  sand3: '#908a8a',
  sand2: '#a8a4a3',
  sand1: '#f4f4f2',
  supersplit: '#fd775e',
  brunchPink: '#fd7a9e',
  bubblegum: '#f9c3c0'
}

const themePalette = {
  primaryMain: palette.blue,
  primaryDark: palette.midnightBlue,
  secondaryLight: palette.bubblegum,
  secondaryMain: palette.brunchPink,
  secondaryDark: palette.supersplit,
  textPrimary: palette.sand4,
  textSecondary: palette.sand3,
  textDisabled: palette.sand1,
  textHint: palette.sand2,
  textContrast: palette.white
}

const theme = {
  color: {
    ...themePalette
  },
  fontSize: {
    xSmall: '0.7rem'
  },
  padding: {
    xSmall: '0.5rem'
  },
  boxShadow: {
    element: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    page: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
  },
  width: {
    input: '10rem'
  }
}

export default theme
