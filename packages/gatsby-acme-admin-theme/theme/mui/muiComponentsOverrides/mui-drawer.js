const { fade } = require('@material-ui/core/styles/colorManipulator')
const palette = require('../palette')

module.exports = {
  paper: {
    '& .MuiListItemText-root': {
      color: palette.background.default,
    },
    '& .MuiListItem-root': {
      color: palette.tertiary.main,
      backgroundColor: palette.primary.main,
      '& > .MuiIcon-colorPrimary': {
        color: palette.tertiary.main,
      },
      '& > .MuiIcon-colorAction': {
        color: palette.secondary.main,
      },
      '& > .MuiIcon-root': {
        marginRight: '8px',
      },
      '& > .expand-icon': {
        height: '32px',
        width: '32px',
      },
    },
    '& .MuiListItem-button': {
      '&:hover': {
        backgroundColor: fade(palette.primary.main, 0.85),
      },
    },
    width: '40%',
  },
}
