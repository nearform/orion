import React from 'react'
import { useQuery } from 'graphql-hooks'
import { getTaxonomyTypes } from '../../queries'
import { withStyles, Typography } from '@material-ui/core'
import get from 'lodash/get'

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
          className={[
            classes.TaxonomyItem,
            classes['TaxonomyC' + taxonomyColor],
          ].join(' ')}
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
          <>
            <Typography
              key={'taxonomy_type_' + type.name}
              className={classes.subhead}
            >
              {type.name}
            </Typography>
            {type.taxonomy_items.map(item => listMatchingItems(item))}
          </>
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
    color: 'white',
    letterSpacing: '1.8px',
    backgroundColor: theme.palette.primary.dark,
  },
  TaxonomyC2: {
    color: 'white',
    letterSpacing: '1.8px',
    backgroundColor: theme.palette.primary.main,
  },
  TaxonomyC3: {
    color: 'white',
    letterSpacing: '1.8px',
    backgroundColor: theme.palette.primary.light,
  },
  TaxonomyC4: {
    color: 'white',
    letterSpacing: '1.8px',
    backgroundColor: theme.palette.secondary.dark,
  },
}))(Taxonomies)
