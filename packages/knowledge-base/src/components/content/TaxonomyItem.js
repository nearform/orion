import React from 'react'
import classnames from 'classnames'
import { withStyles, Button } from '@material-ui/core'

const TaxonomyItem = ({ classes, item, filter, callback }) => {
  const handleCallback = () => {
    if (typeof callback === 'function') {
      callback(item.id, !item.active, item.key)
    }
  }
  if (filter.includes(item.id)) {
    item.active = true
    return (
      <Button
        key={'taxonomy_item_' + item.id}
        className={classnames(
          classes.inlinable,
          classes.TaxonomyItem,
          classes['TaxonomyC' + item.order_index]
        )}
        onClick={handleCallback}
      >
        {item.name}
      </Button>
    )
  } else {
    item.active = false
    return (
      <Button
        key={'taxonomy_item_' + item.id}
        className={classnames(classes.inlinable, classes.TaxonomyItem)}
        onClick={handleCallback}
      >
        {item.name}
      </Button>
    )
  }
}

export default withStyles(theme => ({
  inlinable: {
    [theme.breakpoints.down('xs')]: {
      display: 'inline-block',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  TaxonomyItem: {
    color: theme.palette.primary.dark,
    fontWeight: '900',
    fontSize: '12px',
    letterSpacing: '2.45px',
    textTransform: 'uppercase',
    padding: '4px 8px',
    marginTop: '16px',
    width: 'max-content',
    borderRadius: '0',
  },
  TaxonomyC1: {
    [theme.breakpoints.down('xs')]: {
      color: theme.palette.primary.dark,
    },
    [theme.breakpoints.up('sm')]: {
      color: 'white',
      letterSpacing: '1.8px',
      backgroundColor: theme.palette.primary.dark,
    },
  },
  TaxonomyC2: {
    [theme.breakpoints.down('xs')]: {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.up('sm')]: {
      color: 'white',
      letterSpacing: '1.8px',
      backgroundColor: theme.palette.primary.main,
    },
  },
  TaxonomyC3: {
    [theme.breakpoints.down('xs')]: {
      color: theme.palette.primary.light,
    },
    [theme.breakpoints.up('sm')]: {
      color: 'white',
      letterSpacing: '1.8px',
      backgroundColor: theme.palette.primary.light,
    },
  },
  TaxonomyC4: {
    [theme.breakpoints.down('xs')]: {
      color: theme.palette.secondary.dark,
    },
    [theme.breakpoints.up('sm')]: {
      color: 'white',
      letterSpacing: '1.8px',
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}))(TaxonomyItem)
