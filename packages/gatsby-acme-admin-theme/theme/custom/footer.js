const palette = require('../mui/palette')

module.exports = {
  backgroundColor: palette.secondary.main,
  color: palette.background.default,
  paddingTop: '28px',
  '& .root': {
    paddingTop: '28px',
  },
  '& .MuiGrid-root': {
    '&:first-of-type': {
      paddingBottom: 0,
    },
    '&:second-of-type': {
      marginBottom: '88px',
    },
    '& .social-logos': {
      float: 'right',
      '& > a': {
        margin: '12px',
        float: 'right',
      },
    },
    '& .logo': {
      float: 'right',
    },
  },
  '& .terms': {
    '& > .MuiGrid-root': {
      margin: '30px 8px 30px',
    },
  },
  '& .greeting': {
    fontWeight: 'bold',
  },
}
