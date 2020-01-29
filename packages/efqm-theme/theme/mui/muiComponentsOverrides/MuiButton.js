const palette = require('../palette')
const shadows = require('../shadows')

module.exports = {
  root: {
    whiteSpace: 'nowrap',
    boxShadow: shadows[1],
    '&$outlined': {
      '&:disabled': {
        border: 'none',
        opacity: 0.7,
      },
    },
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
    background: palette.background.default,
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
}
