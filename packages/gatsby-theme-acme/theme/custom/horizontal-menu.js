const palette = require('../mui/palette')

module.exports = {
  popover: {
    '&.language-switcher-menu .MuiMenu-paper': {
      backgroundColor: palette.background.default,
      width: 'auto',
      '& .MuiMenuItem-root': {
        backgroundColor: palette.background.default,
        color: palette.secondary.main,
        '& a': {
          textDecoration: 'none',
          color: 'inherit',
        },
      },
      '& .language-switcher-icon': {
        margin: '4px 4px 0 0',
        padding: 0,
        height: '18px',
      },
    },
    '&:not(.language-switcher-menu) .MuiMenu-paper': {
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
  },
}
