const { fade } = require('@material-ui/core/styles/colorManipulator')
const palette = require('../palette')
const theme = require('@material-ui/core/styles/defaultTheme').default

module.exports = {
  root: {
    boxShadow: '0 2px 0 0 rgba(103, 103, 103, 0.5)',
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'none',
    radius: '4px',
    padding: '1px 20px',
    minWidth: '125px',
    '&.add-photo-button': {
      color: palette.action.main,
      backgroundColor: palette.background.default,
      '& .MuiButton-label .MuiSvgIcon-root': {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(-1),
      },
    },
  },
  containedPrimary: {
    backgroundColor: palette.action.light,
    '&:hover': {
      backgroundColor: fade(palette.action.main, 0.85),
    },
  },
  containedSecondary: {
    backgroundColor: palette.background.default,
    color: palette.action.main,
    '&:hover': {
      color: fade(palette.action.main, 0.8),
      backgroundColor: palette.background.default,
    },
  },
}
