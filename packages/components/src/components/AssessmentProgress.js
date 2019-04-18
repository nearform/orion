import React from 'react'
import T from 'prop-types'
import { withStyles, Grid, Typography } from '@material-ui/core'
import classnames from 'classnames'

const progressWidthPercent = new Array(10).fill(null).reduce(
  (acc, _, i) => ({
    ...acc,
    [`progress${(i + 1) * 10}`]: {
      '&::after': {
        width: `${(i + 1) * 10}%`,
      },
    },
  }),
  {}
)

function AssessmentProgress({
  classes,
  theme,
  progress,
  direction,
  execution,
  results,
}) {
  const getProgressWidthClassName = progressPercent =>
    classes[`progress${Math.min(Math.ceil(progressPercent / 10) * 10, 100)}`]

  return (
    <div className={classes.root}>
      <Grid container spacing={theme.spacing.unit * 2} className={classes.grid}>
        <Grid item xs>
          <Typography color="inherit" variant="h6">
            Overall progress
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography color="inherit" variant="h5">
            {progress}%
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="button" color="inherit" gutterBottom>
            direction
          </Typography>
          <div
            className={classnames(
              classes.progressBar,
              getProgressWidthClassName(direction)
            )}
          />
        </Grid>
        <Grid item xs>
          <Typography variant="button" color="inherit" gutterBottom>
            execution
          </Typography>
          <div
            className={classnames(
              classes.progressBar,
              getProgressWidthClassName(execution)
            )}
          />
        </Grid>
        <Grid item xs>
          <Typography variant="button" color="inherit" gutterBottom>
            results
          </Typography>
          <div
            className={classnames(
              classes.progressBar,
              getProgressWidthClassName(results)
            )}
          />
        </Grid>
      </Grid>
    </div>
  )
}

AssessmentProgress.propTypes = {
  classes: T.object.isRequired,
  theme: T.object.isRequired,
  progress: T.number,
  direction: T.number,
  execution: T.number,
  results: T.number,
}

AssessmentProgress.defaultProps = {
  progress: 0,
  direction: 0,
  execution: 0,
  results: 0,
}

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.dark,
    height: 96,
    color: 'white',
  },
  grid: {
    padding: `0 ${theme.spacing.unit * 4}px`,
  },
  progressBar: {
    borderRadius: 10,
    height: 12,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    '&::after': {
      borderRadius: 10,
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      content: '""',
      backgroundColor: theme.palette.secondary.main,
      transition: 'width .5s ease-in-out',
    },
  },
  ...progressWidthPercent,
})

export default withStyles(styles, { withTheme: true })(AssessmentProgress)
