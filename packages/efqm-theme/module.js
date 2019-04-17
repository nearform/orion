import { withStyles } from '@material-ui/core'
import { fontFamily } from './index'
export { muiTheme } from './index'

const styles = {
  '@global': {
    body: {
      fontFamily,
    },
  },
}

export default withStyles(styles)(({ children }) => children)
