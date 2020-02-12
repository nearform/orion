const palette = require('../palette')

module.exports = {
  paper: {
    backgroundColor: palette.primary.main,
    width: 'auto',
    '& .MuiMenuItem-root': {
      backgroundColor: palette.primary.main,
      color: palette.background.default,
    },
  },
}
