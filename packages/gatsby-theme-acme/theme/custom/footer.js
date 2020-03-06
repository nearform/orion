const palette = require('../mui/palette')

module.exports = {
  backgroundColor: palette.secondary.main,
  color: palette.background.default,
  paddingTop: '28px',
  '& .root': {
    paddingTop: '28px',
  },
  '& .MuiGrid-root': {
    '&:second-of-type': {
      marginBottom: '88px',
    },
    '& .social-logos': {
      '& > a': {
        display: 'block',
      },
    },
  },
  '& .logo': {
    display: 'block',
    width: 110,
  },
  '& .terms': {
    '& > .MuiGrid-root': {
      margin: '30px 8px 30px',
    },
    '& a': {
      color: palette.background.default,
      textDecoration: 'none',
    },
  },
  '& .greeting': {
    fontWeight: 'bold',
  },
}
