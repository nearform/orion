const { colorDefinitions } = require('../../variables')

module.exports = {
  root: { textTransform: 'uppercase' },
  primary: {
    color: colorDefinitions.slateGrey,
    fontSize: 14,
    fontWeight: 900,
    letterSpacing: '1.77px',
  },
  secondary: { color: colorDefinitions.lightGrey, letterSpacing: '1.77px' },
}
