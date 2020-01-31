import { createMuiTheme } from '@material-ui/core'

const color = {
  darkSlateBlue: '#204c67',
  purpleishBlue: '#5a49ff',
  accessibleGreen: '#2aa77b',
  lightGrey: '#9cafc3',
  white: '#fff',
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: color.purpleishBlue,
    },
    secondary: {
      main: color.accessibleGreen,
    },
    text: {
      primary: color.darkSlateBlue,
      secondary: color.white,
    },
  },
})

export default theme
