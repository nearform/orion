const { fontFamily } = require('../typography')

module.exports = {
  sizeSmall: {
    height: '18px',
  },
  label: {
    fontFamily,
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '1.2px',
    lineHeight: '13px',
  },
  icon: {
    fontSize: 'inherit',
    order: 1,
    marginLeft: '-5px',
    marginRight: '5px',
  },
}
