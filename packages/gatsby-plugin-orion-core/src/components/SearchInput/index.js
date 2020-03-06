import React, { useState } from 'react'
import T from 'prop-types'
import { Button, withStyles } from '@material-ui/core'
import Search from '@material-ui/icons/Search'

function SearchInput({ classes, onSearch }) {
  const [value, setValue] = useState('')

  return (
    <div className={classes.root}>
      <input
        className={classes.input}
        placeholder="Search"
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <Button className={classes.button} onClick={() => onSearch(value)}>
        <Search />
      </Button>
    </div>
  )
}

const styles = theme => ({ ...theme.searchInput })

SearchInput.propTypes = {
  classes: T.object,
  onSearch: T.func,
}

SearchInput.defaultProps = {
  classes: undefined,
  onSearch: undefined,
}

export default withStyles(styles, { withTheme: true })(SearchInput)
