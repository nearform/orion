import React from 'react'
import classnames from 'classnames'
import { withStyles, Button } from '@material-ui/core'
import { fade } from '@material-ui/core/styles'

const TaxonomyItem = ({ classes, item, active, activeClassName, callback }) => {
  const handleCallback = () => {
    if (typeof callback === 'function') {
      callback(item.id, !active, item.key)
    }
  }

  return (
    <Button
      key={'taxonomy_item_' + item.id}
      className={classnames(classes.inlinable, classes.TaxonomyItem, {
        [classes[activeClassName]]: active,
      })}
      onClick={handleCallback}
    >
      {item.name}
    </Button>
  )
}

const commonSmallUpStyles = {
  color: 'white',
  letterSpacing: '1.8px',
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
    width: 'auto',
    whiteSpace: 'normal',
    textAlign: 'left',
    padding: '8px 10px',
    borderRadius: '0',
    [theme.breakpoints.down('xs')]: {
      padding: '6px 7px',
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: '4px',
      '&:first-of-type': {
        marginTop: '10px',
      },
    },
  },
  TaxonomyC1: {
    [theme.breakpoints.down('xs')]: {
      color: theme.taxonomyColor.C1,
    },
    [theme.breakpoints.up('sm')]: {
      ...commonSmallUpStyles,
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
      ...commonSmallUpStyles,
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
      ...commonSmallUpStyles,
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
      ...commonSmallUpStyles,
      backgroundColor: theme.taxonomyColor.C4,
      '&:hover, &:focus': {
        backgroundColor: fade(theme.taxonomyColor.C4, 0.8),
      },
    },
  },
}))(TaxonomyItem)
