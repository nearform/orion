const { colorDefinitions } = require('../variables')
const typography = require('./typography')

module.exports = {
  root: {
    ...typography.body1,
    borderRadius: 3,
    backgroundColor: colorDefinitions.paleGrey,
  },
  input: {
    padding: '7.5px 12px 8.5px',
  },
}
