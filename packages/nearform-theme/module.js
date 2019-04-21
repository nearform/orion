import { withStyles } from '@material-ui/core'
import { bodyFontFamily } from './index'

export * from './index'

const styles = {
  '@global': {
    body: {
      overflowY: 'scroll',
      fontFamily: bodyFontFamily,
    },
  },
}

export default withStyles(styles)(({ children }) => children)
