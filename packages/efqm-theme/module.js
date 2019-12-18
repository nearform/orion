import { withStyles } from '@material-ui/core'

import { theme } from './index'

export * from './index'

const styles = {
  '@global': {
    body: {
      overflowY: 'scroll',
      fontFamily: theme.fontFamily,
    },
    a: {
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
        textDecorationColor: theme.muiTheme.palette.secondary.main,
      },
    },
  },
}

export default withStyles(styles)(({ children }) => children)
