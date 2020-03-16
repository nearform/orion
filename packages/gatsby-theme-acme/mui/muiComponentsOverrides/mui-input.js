import palette from '../palette'
import typography from '../typography'

export default {
  root: {
    ...typography.body1,
    border: `solid 1px ${palette.tertiary.main}`,
    borderRadius: '3px',
    backgroundColor: palette.background.dark,
    fontSize: '12px',
    padding: '7.5px 12px 8.5px',
  },
  underline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
}
