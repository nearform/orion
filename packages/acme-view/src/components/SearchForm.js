import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Button, InputBase } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'

const useStyles = makeStyles(theme => {
  return {
    root: {
      background: 'none',
      padding: '0',
      display: 'flex',
      alignItems: 'center',
      width: 400,
      position: 'relative',
      '& .MuiGrid-item': {
        background: 'none',
      },
      '& .MuiGrid-item:first-of-type': {
        flex: 1,
      },
      '& .MuiGrid-item:last-of-type': {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 44,
      },
      '& .MuiButtonBase-root': {
        backgroundColor: theme.palette.action.main,
        boxShadow: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 44,
        height: 40,
        minWidth: 0,
      },
      '& .MuiButtonBase-root svg': {
        fill: theme.palette.common.white,
      },
      '& .MuiInputBase-root': {
        flex: 1,
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.palette.tertiary.main,
        backgroundColor: theme.palette.common.white,
        padding: '3px 56px 3px 12px',
        width: '100%',
      },
      '& .MuiInputBase-root::placeholder': {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: 1.43,
      },
    },
  }
})

const SearchForm = () => {
  const classes = useStyles()

  return (
    <Grid
      container
      component="form"
      classes={classes}
      onSubmit={e => e.preventDefault()}
    >
      <Grid item>
        <InputBase
          placeholder="Search Acme"
          inputProps={{ 'aria-label': 'search acme' }}
        />
      </Grid>
      <Grid item>
        <Button type="submit" aria-label="search">
          <SearchIcon />
        </Button>
      </Grid>
    </Grid>
  )
}

export default SearchForm
