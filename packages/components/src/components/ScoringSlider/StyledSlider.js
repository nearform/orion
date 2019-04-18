import { withStyles } from '@material-ui/core'
import Slider from '@material-ui/lab/Slider'

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 2,
  },
  track: {
    height: theme.spacing.unit * 2,
    backgroundColor: theme.palette.background.default,
    opacity: 1,
  },
  trackBefore: {
    borderTopLeftRadius: theme.spacing.unit,
    borderBottomLeftRadius: theme.spacing.unit,
  },
  trackAfter: {
    borderTopRightRadius: theme.spacing.unit,
    borderBottomRightRadius: theme.spacing.unit,
  },
  thumb: {
    borderRadius: theme.spacing.unit / 2,
    height: theme.spacing.unit * 4,
    width: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
    boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.1)',
  },
  thumbIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const StyledSlider = withStyles(styles)(Slider)

StyledSlider.propTypes = { ...Slider.propTypes }

export default StyledSlider
