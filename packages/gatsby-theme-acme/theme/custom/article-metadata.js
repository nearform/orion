const palette = require('../mui/palette')
const typography = require('../mui/typography')
const { fade } = require('@material-ui/core/styles/colorManipulator')

module.exports = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 208,
  },
  author: {
    display: 'flex',
    margin: '8px 4px',
    '& > :first-child': {
      marginRight: 8,
      width: 38,
    },
  },
  data: {
    ...typography.h6,
    color: fade(palette.secondary.main, 0.6),
    display: 'flex',
    margin: '8px 4px',
    '& > :first-child': {
      color: palette.tertiary.main,
      marginRight: 6,
      width: 38,
    },
  },
  name: {
    ...typography.h5,
  },
  section: {
    ...typography.h5,
    borderBottom: '4px solid',
    borderBottomColor: palette.secondary.main,
    marginBottom: 12,
    paddingBottom: 8,
  },
  title: {
    ...typography.h6,
  },
}
