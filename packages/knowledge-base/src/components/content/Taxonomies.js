import React from 'react'
import classnames from 'classnames'
import { useQuery } from 'graphql-hooks'
import get from 'lodash/get'
import { withStyles, Typography } from '@material-ui/core'

import { getTaxonomyTypes } from '../../queries'

const Taxonomies = ({ classes, items, showAll }) => {
  const { data: taxonomyData } = useQuery(getTaxonomyTypes)
  const taxonomyTypes = get(taxonomyData, 'taxonomy_type', [])
  //TODO: nicer loading indication
  if (!taxonomyTypes) return null

  const taxonomyDirty = []
  for (let obj of items) {
    taxonomyDirty.push(obj.taxonomy_id)
  }
  const taxonomyIds = taxonomyDirty.filter((val, i, a) => a.indexOf(val) === i)

  const listMatchingItems = item => {
    if (taxonomyIds.find(itemId => itemId === item.id)) {
      return (
        <div
          key={'taxonomy_item_' + item.id}
          className={classnames(
            classes.inlinable,
            classes.TaxonomyItem,
            classes['TaxonomyC' + taxonomyColor]
          )}
        >
          {item.name}
        </div>
      )
    } else if (showAll) {
      return (
        <div key={'taxonomy_item_' + item.id} className={classes.TaxonomyItem}>
          {item.name}
        </div>
      )
    }
  }
  let taxonomyColor = 0

  return (
    <>
      {taxonomyTypes.map(type => {
        taxonomyColor++
        return (
          <div
            className={classes.TaxonomyType}
            key={'taxonomy_type_' + type.name}
          >
            <Typography
              className={classnames(classes.inlinable, classes.subhead)}
            >
              {type.name}
            </Typography>
            {type.taxonomy_items.map(item => listMatchingItems(item))}
          </div>
        )
      })}
    </>
  )
}

export default withStyles(theme => ({
  subhead: {
    fontWeight: '900',
    fontSize: '12px',
    letterSpacing: '1.8px',
    textTransform: 'uppercase',
    marginTop: '16px',
    color: theme.palette.tertiary.main,
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(1.5),
    },
  },
  inlinable: {
    [theme.breakpoints.down('xs')]: {
      display: 'inline-block',
    },
  },
  TaxonomyType: {
    margin: theme.spacing(1, 0, 2),
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
}))(Taxonomies)
