import { withStyles } from '@material-ui/core'
import { theme } from '.'

export * from '.'

const styles = {
  '@global': {
    body: {
      overflowY: 'scroll',
      fontFamily: theme.fontFamily,
    },
  },
}

export default withStyles(styles)(({ children }) => children)
