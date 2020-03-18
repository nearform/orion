import BreadcrumbNavigation from 'gatsby-plugin-orion-core/src/components/BreadcrumbNavigation'
import PaddedContainer from 'gatsby-plugin-orion-core/src/components/PaddedContainer'
import React from 'react'
import T from 'prop-types'
import { Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    padding: theme.spacing(2, 0),
    width: '100%',
    '& a': {
      ...theme.typography.h5,
      color: theme.palette.primary.main,
      fontSize: 16,
    },
  },
}))

function SecondaryAppBar({ action, data }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <PaddedContainer>
        <Grid container>
          <Grid container item xs={9} alignItems="center">
            <BreadcrumbNavigation data={data} />
          </Grid>
          <Grid container item xs={3} alignItems="center" justify="flex-end">
            {action}
          </Grid>
        </Grid>
      </PaddedContainer>
    </div>
  )
}

SecondaryAppBar.propTypes = {
  action: T.node.isRequired,
  data: T.arrayOf(
    T.shape({
      title: T.string.isRequired,
      to: T.string,
    })
  ),
}

SecondaryAppBar.defaultProps = {
  data: [],
}

export default SecondaryAppBar
