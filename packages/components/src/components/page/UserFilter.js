import React from 'react'
import T from 'prop-types'

import { withStyles, Input } from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList'

const UserFilter = ({ setFilterText, classes }) => (
  <Input
    fullWidth
    className={classes.filterInput}
    endAdornment={<FilterListIcon color="secondary" />}
    onChange={event => setFilterText(event.target.value)}
  />
)

UserFilter.propTypes = {
  classes: T.object,
  setFilterText: T.func,
}

const styles = () => ({
  filterInput: {
    maxWidth: 318,
    margin: '0 auto 0 0',
  },
})

export default withStyles(styles, { withTheme: true })(UserFilter)
