import BreadcrumbNavigation from '../BreadcrumbNavigation'
import PaddedContainer from 'gatsby-plugin-orion-core/src/components/PaddedContainer'
import React from 'react'
import T from 'prop-types'
import { Grid, withStyles } from '@material-ui/core'

function SecondaryAppBar({ action, classes, data, disablePadding = false }) {
  const Wrap = disablePadding ? React.Fragment : PaddedContainer

  return (
    <div className={classes.root}>
      <Wrap>
        <Grid container>
          <Grid container item xs={9} alignItems="center">
            <BreadcrumbNavigation data={data} />
          </Grid>
          <Grid container item xs={3} alignItems="center" justify="flex-end">
            {action}
          </Grid>
        </Grid>
      </Wrap>
    </div>
  )
}

const styles = theme => ({ ...theme.secondaryAppBar })

SecondaryAppBar.propTypes = {
  action: T.node.isRequired,
  classes: T.object,
  data: T.arrayOf(
    T.shape({
      title: T.string.isRequired,
      to: T.string,
    })
  ),
  disablePadding: T.bool,
}

SecondaryAppBar.defaultProps = {
  classes: undefined,
  data: [],
  onSearch: undefined,
}

export default withStyles(styles, { withTheme: true })(SecondaryAppBar)
