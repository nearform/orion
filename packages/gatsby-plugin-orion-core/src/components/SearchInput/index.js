import React, { useState } from 'react'
import T from 'prop-types'
import { Button, makeStyles } from '@material-ui/core'
import Search from '@material-ui/icons/Search'
import { fade } from '@material-ui/core/styles/colorManipulator'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  input: {
    ...theme.typography.h6,
    backgroundColor: theme.palette.background.dark,
    border: '1px solid',
    borderColor: theme.palette.tertiary.main,
    borderBottomLeftRadius: 4,
    borderRight: 0,
    borderTopLeftRadius: 4,
    flex: 1,
    padding: theme.spacing(0.5),
    outline: 0,
    paddingLeft: 12,
    '&::placeholder': {
      ...theme.typography.h6,
    },
  },
  button: {
    backgroundColor: theme.palette.action.main,
    border: '1px solid',
    borderColor: theme.palette.tertiary.main,
    borderRadius: 4,
    borderBottomLeftRadius: 0,
    borderLeft: 0,
    borderTopLeftRadius: 0,
    boxShadow: 'none',
    color: theme.palette.background.default,
    padding: 4,
    width: 34,
    minWidth: 32,
    '&:hover': {
      backgroundColor: fade(theme.palette.action.main, 0.8),
    },
  },
}))

function SearchInput({ onSearch, placeholderText }) {
  const classes = useStyles()
  const [value, setValue] = useState('')

  return (
    <div className={classes.root}>
      <input
        className={classes.input}
        placeholder={placeholderText}
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <Button className={classes.button} onClick={() => onSearch(value)}>
        <Search />
      </Button>
    </div>
  )
}

SearchInput.propTypes = {
  onSearch: T.func,
  placeholderText: T.string,
}

SearchInput.defaultProps = {
  placeholderText: 'Search',
  onSearch: () => undefined,
}

export default SearchInput
