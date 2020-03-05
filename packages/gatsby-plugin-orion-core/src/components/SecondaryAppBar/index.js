import BreadcrumbNavigation from '../BreadcrumbNavigation'
import PaddedContainer from '../PaddedContainer'
import React from 'react'
import T from 'prop-types'
import { Grid, withStyles } from '@material-ui/core'

function SecondaryAppBar({ action, classes, data }) {
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
}

SecondaryAppBar.defaultProps = {
  classes: undefined,
  data: [],
}

export default withStyles(styles, { withTheme: true })(SecondaryAppBar)
