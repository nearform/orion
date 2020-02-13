const { colorDefinitions, fontFamily } = require('../variables')

module.exports = {
  title: {
    textAlign: 'left',
    fontFamily,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: '-0.1px',
    color: colorDefinitions.slateGrey,
  },
  date: {
    fontFamily,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '1.23px',
    color: colorDefinitions.purple,
    textTransform: 'uppercase',
  },
  author: {
    fontFamily,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '1.23px',
    color: colorDefinitions.lightGrey,
    textTransform: 'uppercase',
  },
  caption: {
    fontFamily,
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: '2.45px',
    color: colorDefinitions.white,
    textTransform: 'uppercase',
  },
}
