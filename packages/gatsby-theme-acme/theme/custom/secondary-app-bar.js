const palette = require('../mui/palette')
const typography = require('../mui/typography')

module.exports = {
  root: {
    backgroundColor: palette.background.dark,
    padding: '8px 0',
    width: '100%',
    '& a': {
      ...typography.h5,
      color: palette.primary.main,
      fontSize: '16px',
    },
  },
}
