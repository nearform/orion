const palette = require('../palette')

module.exports = {
  root: {
    boxShadow: 'none',
    '& .nested-menu-item': {
      height: 'auto',
    },
    '& .MuiToolbar-root': {
      maxWidth: 1120,
      margin: '0 auto',
      width: '100%',
    },
    '& .MuiToolbar-root > .MuiGrid-root': {
      margin: '0 auto',
    },
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
    '& .MuiButton-root': {
      textTransform: 'none',
      boxShadow: 'none',
    },
    '& .language-switcher': {
      backgroundColor: palette.background.paper,
      boxShadow:
        '0 0 5px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.1)',
      height: 32,
      borderRadius: '4px',
      '& .MuiSelect-icon': {
        fill: palette.secondary.main,
      },
      '& .MuiSelect-select:focus': {
        backgroundColor: 'transparent',
      },
    },
    '& .language-switcher-item': {
      color: palette.secondary.main,
      fontSize: 12,
      minHeight: 0,
      backgroundColor: 'transparent',
      paddingLeft: '12px',
      paddingRight: '2px',
    },
    '& .language-switcher-icon': {
      margin: '4px 4px 0 0',
      padding: 0,
      height: '18px',
    },
    '& .brand-logo': {
      height: '40px',
      width: '90px',
      paddingTop: 0,
      paddingBottom: 0,
    },
    '& .brand-logo img': {
      width: '100%',
    },
  },
}
