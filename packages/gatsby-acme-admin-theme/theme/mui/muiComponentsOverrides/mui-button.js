const { fade } = require('@material-ui/core/styles/colorManipulator')
const palette = require('../palette')

module.exports = {
  root: {
    boxShadow: '0 2px 0 0 rgba(103, 103, 103, 0.5)',
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'none',
    radius: '4px',
    padding: '1px 20px',
    minWidth: '125px',
  },
  containedPrimary: {
    backgroundColor: palette.action.light,
    '&:hover': {
      backgroundColor: fade(palette.action.main, 0.85),
    },
  },
}
