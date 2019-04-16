import { withStyles } from '@material-ui/core'
import { bodyFontFamily } from './index'
export { muiTheme } from './index'

const styles = {
  '@global': {
    body: {
      fontFamily: bodyFontFamily,
    },
  },
}

export default withStyles(styles)(({ children }) => children)
