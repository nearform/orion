import flatMap from 'lodash/flatMap'

export const getTaxonomyItemByKey = (taxonomyTypes, key) =>
  flatMap(taxonomyTypes, type => type.taxonomy_items).find(
    item => item.key === key
  )

const sortTaxonomyIdsByType = (taxonomyTypes, taxonomyIds) => {
  const sorted = []
  for (const type of taxonomyTypes) {
    sorted[type.key] = type.taxonomy_items
      .filter(item => taxonomyIds.includes(item.id))
      .map(item => item.id)
  }

  return sorted
}

export const buildWhereClause = (
  mainTaxonomyKey,
  selectedTaxonomyIds,
  taxonomyTypes
) => {
  const clause = {
    status: { _eq: 'published' },
    _and: [],
  }

  if (mainTaxonomyKey !== undefined && mainTaxonomyKey !== null) {
    clause._and.push({
      // eslint-disable-next-line camelcase
      taxonomy_items: { taxonomy: { key: { _ilike: mainTaxonomyKey } } },
    })
  }

  if (selectedTaxonomyIds.length >= 1) {
    const sortedTax = sortTaxonomyIdsByType(taxonomyTypes, selectedTaxonomyIds)
    for (const type in sortedTax) {
      if (sortedTax[type].length >= 1) {
        clause._and.push({
          // eslint-disable-next-line camelcase
          taxonomy_items: { taxonomy_id: { _in: sortedTax[type] } },
        })
      }
    }
  }

  return clause
}
