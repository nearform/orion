import { withStyles } from '@material-ui/core'

// If we import '.' directly, it will import this file, as defined in the package.json and not index.js
/* eslint-disable import/no-useless-path-segments */
import { theme } from '.'

export * from './index'
/* eslint-enable import/no-useless-path-segments */

const styles = {
  '@global': {
    'html, body, body > div, body > div > div': {
      height: '100%',
    },
    body: {
      overflowY: 'scroll',
      fontFamily: theme.fontFamily,
    },
  },
}

export default withStyles(styles)(({ children }) => children)
