const palette = require('../palette')

module.exports = {
  root: {
    '& .MuiButton-label': {
      color: palette.background.default,
      '& .horizontal-navigation-menu-label-icon': {
        marginLeft: '8px',
        marginRight: '8px',
      },
      '& .horizontal-navigation-menu-indicator-icon': {
        marginLeft: '8px',
        marginRight: '0',
      },
    },
  },
}
