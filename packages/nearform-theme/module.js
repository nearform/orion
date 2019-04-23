import { withStyles } from '@material-ui/core'
import { theme } from './index'

export * from './index'

const styles = {
  '@global': {
    body: {
      overflowY: 'scroll',
      fontFamily: theme.fontFamily,
    },
  },
}

export default withStyles(styles)(({ children }) => children)
