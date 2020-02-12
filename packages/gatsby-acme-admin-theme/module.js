import { withStyles } from '@material-ui/core'

// If we import '.' directly, it will import this file, as defined in the package.json and not index.js
/* eslint-disable unicorn/import-index,import/no-useless-path-segments */
import { theme } from './index'

export * from './index'
/* eslint-enable unicorn/import-index,import/no-useless-path-segments */

const styles = {
  '@global': {
    body: {
      overflowY: 'scroll',
      fontFamily: theme.fontFamily,
    },
    a: {
      textDecoration: 'none',
      color: theme.muiTheme.palette.action.main,
      '&:hover': {
        textDecoration: 'underline',
        textDecorationColor: theme.muiTheme.palette.action.main,
      },
    },
  },
}

export default withStyles(styles)(({ children }) => children)
