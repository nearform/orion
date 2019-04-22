import { withStyles } from '@material-ui/core'

import { fontFamily } from './index'

export * from './index'

const styles = {
  '@global': {
    body: {
      overflowY: 'scroll',
      fontFamily,
    },
  },
}

export default withStyles(styles)(({ children }) => children)
