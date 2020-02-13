const palette = require('../mui/palette')
const typography = require('../mui/typography')
const { fade } = require('@material-ui/core/styles/colorManipulator')

module.exports = {
  root: {
    display: 'flex',
    width: '100%',
  },
  input: {
    ...typography.h6,
    border: 0,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    flex: 1,
    padding: 8,
    outline: 0,
    paddingLeft: 12,
  },
  button: {
    backgroundColor: palette.action.main,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    color: palette.background.default,
    height: '100%',
    padding: 4,
    minWidth: 32,
    '&:hover': {
      backgroundColor: fade(palette.action.main, 0.8),
    },
  },
}
