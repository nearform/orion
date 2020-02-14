const typography = require('../mui/typography')

module.exports = {
  content: {
    '& h1': {
      ...typography.h1,
      marginBottom: 16,
    },
    '& h2': {
      ...typography.h2,
      marginBottom: 16,
    },
    '& h3': {
      ...typography.h3,
      marginBottom: 16,
    },
    '& h4': {
      ...typography.h4,
      marginBottom: 16,
    },
    '& h5': {
      ...typography.h5,
      marginBottom: 16,
    },
    '& p': {
      ...typography.body1,
      fontSize: '16px',
      lineHeight: '22px',
      marginBottom: 16,
      '&:first-of-type': {
        fontSize: '21px',
        lineHeight: '28px',
      },
    },
    '& li': {
      ...typography.body1,
      fontSize: '16px',
      lineHeight: '22px',
      marginBottom: 16,
    },
  },
  image: {
    width: '100%',
    marginBottom: 16,
  },
  title: {
    ...typography.h1,
    marginBottom: 16,
  },
  subtitle: {
    ...typography.h2,
    marginBottom: 16,
  },
}
