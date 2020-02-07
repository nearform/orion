const { fade } = require('@material-ui/core/styles/colorManipulator')
const palette = require('../palette')

module.exports = {
  root: {
    color: palette.tertiary.main,
    backgroundColor: palette.primary.main,
    '& > .MuiIcon-colorPrimary': {
      color: palette.tertiary.main,
    },
    '& > .MuiIcon-colorAction': {
      color: palette.secondary.main,
    },
    '& > .MuiIcon-root': {
      marginRight: '8px',
    },
    '& > .expand-icon': {
      height: '32px',
      width: '32px',
    },
  },
  button: {
    '&:hover': {
      backgroundColor: fade(palette.primary.main, 0.85),
    },
  },
  primary: {
    fontSize: 14,
    fontWeight: 900,
    letterSpacing: '1.77px',
  },
  secondary: { color: palette.tertiary.main, letterSpacing: '1.77px' },
}
