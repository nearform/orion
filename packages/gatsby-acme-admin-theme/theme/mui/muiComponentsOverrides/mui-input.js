const palette = require('../palette')
const typography = require('../typography')

module.exports = {
  underline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
  input: {
    ...typography.body1,
    border: `solid 1px ${palette.tertiary.main}`,
    borderRadius: '3px',
    backgroundColor: palette.background.dark,
    fontSize: '12px',
    padding: '7.5px 12px 8.5px',
  },
}
