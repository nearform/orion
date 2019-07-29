import React from 'react'
import { useQuery } from 'graphql-hooks'
import { getTaxonomyTypes } from '../../queries'
import { withStyles, Typography } from '@material-ui/core'
import get from 'lodash/get'

const Taxonomies = ({ classes, items }) => {
  const { data: taxonomyData } = useQuery(getTaxonomyTypes)
  const taxonomyTypes = get(taxonomyData, 'taxonomy_type', [])
  //TODO: nicer loading indication
  if (!taxonomyTypes) return null

  const taxonomyIds = []
  for (let obj of items) {
    taxonomyIds.push(obj.taxonomy_id)
  }

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
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: theme.palette.tertiary.main,
  },
  TaxonomyItem: {
    color: 'white',
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    padding: '4px 8px',
    marginTop: '4px !important',
    width: 'max-content',
  },
  TaxonomyC1: {
    backgroundColor: theme.palette.primary.dark,
  },
  TaxonomyC2: {
    backgroundColor: theme.palette.primary.main,
  },
  TaxonomyC3: {
    backgroundColor: theme.palette.primary.light,
  },
  TaxonomyC4: {
    backgroundColor: theme.palette.secondary.dark,
  },
}))(Taxonomies)
