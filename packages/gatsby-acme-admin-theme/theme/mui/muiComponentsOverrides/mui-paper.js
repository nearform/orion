const palette = require('../palette')

module.exports = {
  root: {
    '& .MuiListItemText-root': {
      color: palette.primary.main,
    },
    '& .MuiListItem-root': {
      color: palette.tertiary.main,
      backgroundColor: palette.background.dark,
      '& > .MuiIcon-colorPrimary': {
        color: palette.background.dark,
      },
      '& > .MuiIcon-colorAction': {
        color: palette.tertiary.main,
      },
      '& > .MuiIcon-root': {
        marginRight: '8px',
      },
      '& > .expand-icon': {
        height: '32px',
        width: '32px',
      },
    },
    width: '40%',
  },
}
