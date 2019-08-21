import React from 'react'
import classnames from 'classnames'
import { withStyles, Button } from '@material-ui/core'
import { fade } from '@material-ui/core/styles'

const TaxonomyItem = ({ classes, item, filter, callback }) => {
  let isActive = false
  const handleCallback = () => {
    if (typeof callback === 'function') {
      callback(item.id, !isActive, item.key)
    }
  }
  if (filter.includes(item.id)) {
    isActive = true
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
    isActive = false
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
    padding: '8px 10px',
    marginTop: '4px',
    width: 'max-content',
    borderRadius: '0',
    '&:first-of-type': {
      marginTop: '10px',
    },
    [theme.breakpoints.up('sm')]: {
      color: 'white',
      letterSpacing: '1.8px',
    },
  },
  TaxonomyC1: {
    [theme.breakpoints.down('xs')]: {
      color: theme.taxonomyColor.C1,
    },
    [theme.breakpoints.up('sm')]: {
      backgroundColor: theme.taxonomyColor.C1,
      '&:hover, &:focus': {
        backgroundColor: fade(theme.taxonomyColor.C1, 0.8),
      },
    },
  },
  TaxonomyC2: {
    [theme.breakpoints.down('xs')]: {
      color: theme.taxonomyColor.C2,
    },
    [theme.breakpoints.up('sm')]: {
      backgroundColor: theme.taxonomyColor.C2,
      '&:hover, &:focus': {
        backgroundColor: fade(theme.taxonomyColor.C2, 0.8),
      },
    },
  },
  TaxonomyC3: {
    [theme.breakpoints.down('xs')]: {
      color: theme.taxonomyColor.C3,
    },
    [theme.breakpoints.up('sm')]: {
      backgroundColor: theme.taxonomyColor.C3,
      '&:hover, &:focus': {
        backgroundColor: fade(theme.taxonomyColor.C3, 0.8),
      },
    },
  },
  TaxonomyC4: {
    [theme.breakpoints.down('xs')]: {
      color: theme.taxonomyColor.C4,
    },
    [theme.breakpoints.up('sm')]: {
      backgroundColor: theme.taxonomyColor.C4,
      '&:hover, &:focus': {
        backgroundColor: fade(theme.taxonomyColor.C4, 0.8),
      },
    },
  },
}))(TaxonomyItem)
