import { withStyles } from '@material-ui/core'
import { bodyFontFamily } from './index'
import { muiTheme } from './index'

const styles = {
  '@global': {
    body: {
      fontFamily: bodyFontFamily,
    },
  },
}

export default withStyles(styles)(({ children }) => children)
export { muiTheme }
