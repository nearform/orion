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
    backgroundColor: palette.background.dark,
    border: '1px solid',
    borderColor: palette.tertiary.main,
    borderBottomLeftRadius: 4,
    borderRight: 0,
    borderTopLeftRadius: 4,
    flex: 1,
    padding: 8,
    outline: 0,
    paddingLeft: 12,
    '&::placeholder': {
      ...typography.h6,
    },
  },
  button: {
    backgroundColor: palette.action.main,
    border: '1px solid',
    borderColor: palette.tertiary.main,
    borderRadius: 4,
    borderBottomLeftRadius: 0,
    borderLeft: 0,
    borderTopLeftRadius: 0,
    boxShadow: 'none',
    color: palette.background.default,
    height: '100%',
    padding: 4,
    minWidth: 32,
    '&:hover': {
      backgroundColor: fade(palette.action.main, 0.8),
    },
  },
}
