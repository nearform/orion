const palette = require('../palette')

module.exports = {
  root: { textTransform: 'uppercase' },
  primary: {
    color: palette.primary.dark,
    fontSize: 14,
    fontWeight: 900,
    letterSpacing: '1.77px',
  },
  secondary: { color: palette.tertiary.main, letterSpacing: '1.77px' },
}
