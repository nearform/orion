const palette = require('./palette')
const { fade } = require('@material-ui/core/styles/colorManipulator')

module.exports = {
  fontFamily: `'Titillium Web', sans-serif`,
  color: palette.primary.dark,
  fontWeight: 'normal',
  h1: {
    color: palette.secondary.main,
    fontSize: '32px',
    fontWeight: 'bold',
    fontFamily: 'Clarendon',
  },
  h2: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  h3: {
    color: palette.secondary.main,
    fontSize: '21px',
    fontWeight: 'bold',
    fontFamily: 'Clarendon',
  },
  h4: {
    color: palette.secondary.main,
    fontSize: '18px',
    fontWeight: 'bold',
    fontFamily: 'Clarendon',
  },
  h5: {
    color: palette.secondary.main,
    fontSize: '16px',
    fontWeight: 'bold',
  },
  h6: {
    color: fade(palette.secondary.main, 0.6),
    fontSize: '14px',
    fontWeight: 'bold',
    '& a': {
      textDecoration: 'none',
      color: palette.action.main,
      '&:hover': {
        textDecoration: 'underline',
        textDecorationColor: palette.action.main,
      },
    },
  },
  body1: {
    fontSize: '16px',
    '& p:first-of-type': {
      fontSize: '21px',
    },
    '& a': {
      textDecoration: 'none',
      color: palette.action.main,
      '&:hover': {
        textDecoration: 'underline',
        textDecorationColor: palette.action.main,
      },
    },
  },
  body2: {
    fontSize: '14px',
  },
}
