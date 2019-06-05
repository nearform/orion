import React from 'react'
import T from 'prop-types'
import { withStyles, Grid, Typography } from '@material-ui/core'
import classnames from 'classnames'

import { PaddedContainer } from '..'

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
    <PaddedContainer className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Typography color="inherit" variant="h2">
                Overall progress
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="inherit" variant="h1">
                {progress}%
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Typography variant="h4" color="inherit" gutterBottom>
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
          <Typography variant="h4" color="inherit" gutterBottom>
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
          <Typography variant="h4" color="inherit" gutterBottom>
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
    </PaddedContainer>
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
