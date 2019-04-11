const palette = {
  white: '#ffffff',
  lightOrange: '#FFCB09',
  orange: '#f37021',
  purple: '#AE2756',
  indigo: '#605980',
  darkIndigo: '#454B66',
  sand4: '#6d6d68',
  sand3: '#908a8a',
  sand2: '#a8a4a3',
  sand1: '#f4f4f2',
  red: '#ED1B34',
}

const themePalette = {
  primaryLight: palette.lightOrange,
  primaryMain: palette.orange,
  primaryDark: palette.purple,
  secondaryMain: palette.indigo,
  secondaryDark: palette.darkIndigo,
  textPrimary: palette.sand4,
  textSecondary: palette.sand3,
  textDisabled: palette.sand1,
  textHint: palette.sand2,
  textContrast: palette.white,
}

const theme = {
  color: {
    ...themePalette,
  },
  backgroundColor: {
    ...themePalette,
  },
  fontSize: {
    xSmall: '0.7rem',
  },
  padding: {
    xSmall: '0.5rem',
  },
  boxShadow: {
    element: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    page: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  },
  width: {
    input: '10rem',
  },
}

export default theme
