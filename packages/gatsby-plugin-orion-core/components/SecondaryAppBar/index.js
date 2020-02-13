import BreadcrumbNavigation from '../BreadcrumbNavigation'
import PaddedContainer from '../PaddedContainer'
import SearchInput from '../SearchInput'
import React from 'react'
import T from 'prop-types'
import { Grid, withStyles } from '@material-ui/core'

function SecondaryAppBar({ classes, data, onSearch }) {
  return (
    <div className={classes.root}>
      <PaddedContainer>
        <Grid container>
          <Grid container item xs={9} alignItems="center">
            <BreadcrumbNavigation data={data} />
          </Grid>
          <Grid item xs={3}>
            <SearchInput onSearch={onSearch} />
          </Grid>
        </Grid>
      </PaddedContainer>
    </div>
  )
}

const styles = theme => ({ ...theme.secondaryAppBar })

SecondaryAppBar.propTypes = {
  classes: T.object,
  data: T.arrayOf(
    T.shape({
      title: T.string.isRequired,
      to: T.string,
    })
  ),
  onSearch: T.func,
}

export default withStyles(styles, { withTheme: true })(SecondaryAppBar)
