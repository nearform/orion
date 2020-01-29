const { colorDefinitions } = require('../../variables')

const shadows = require('../shadows')
const typography = require('../typography')

module.exports = {
  root: {
    ...typography.body1,
    borderRadius: 3,
    boxShadow: shadows[1],
    background: colorDefinitions.white,
  },
  notchedOutline: {
    border: 'none',
  },
  input: {
    padding: '7.5px 12px 8.5px',
  },
}
