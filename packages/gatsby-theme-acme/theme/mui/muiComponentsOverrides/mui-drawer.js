const { fade } = require('@material-ui/core/styles/colorManipulator')
const palette = require('../palette')

module.exports = {
  paper: {
    '& .MuiListItemText-root': {
      color: palette.background.default,
    },
    '& .MuiListItem-root': {
      color: palette.tertiary.main,
      backgroundColor: palette.secondary.main,
      '& > .MuiIcon-colorPrimary': {
        color: palette.tertiary.main,
      },
      '& > .MuiIcon-colorAction': {
        color: palette.action.main,
      },
      '& > .MuiIcon-root': {
        marginRight: '8px',
      },
      '& > .expand-icon': {
        height: '32px',
        width: '32px',
      },
    },
    '& .close-button': {
      color: palette.tertiary.main,
    },
    '& .MuiListItem-button': {
      '&:hover': {
        backgroundColor: fade(palette.secondary.main, 0.85),
      },
    },
    width: '40%',
  },
}
