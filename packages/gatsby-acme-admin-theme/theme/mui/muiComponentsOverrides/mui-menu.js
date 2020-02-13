const palette = require('../palette')

module.exports = {
  paper: {
    backgroundColor: palette.primary.main,
    width: 'auto',
    '& .MuiMenuItem-root': {
      backgroundColor: palette.primary.main,
      color: palette.background.default,
      '& a': {
        textDecoration: 'none',
        color: 'inherit',
      },
    },
    '& .horizontal-navigation-menu-label-icon': {
      marginLeft: '8px',
      marginRight: '8px',
    },
    '& .horizontal-navigation-menu-indicator-icon': {
      marginLeft: '8px',
      marginRight: '0',
    },
  },
}
