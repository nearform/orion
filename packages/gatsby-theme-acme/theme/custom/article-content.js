const palette = require('../mui/palette')
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
    '& blockquote': {
      ...typography.body1,
      alignItems: 'flex-start',
      display: 'flex',
      fontSize: '16px !important',
      fontStyle: 'italic',
      margin: 0,
      '&:before': {
        backgroundColor: palette.secondary.main,
        borderRadius: 8,
        content: '""',
        display: 'block',
        height: 33,
        marginLeft: 16,
        marginRight: 16,
        width: 8,
      },
      '& *': {
        fontSize: '16px !important',
      },
    },
    '& ol': {
      counterReset: 'ol',
      listStyle: 'none',
      marginLeft: 16,
      padding: 0,
      '& li': {
        counterIncrement: 'ol',
        '&:before': {
          content: 'counter(ol) "."',
          marginRight: 16,
        },
      },
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
