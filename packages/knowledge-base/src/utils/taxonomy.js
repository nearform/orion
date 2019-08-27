import flatMap from 'lodash/flatMap'

export const getTaxonomyItemByKey = (taxonomyTypes, key) =>
  flatMap(taxonomyTypes, type => type.taxonomy_items).find(
    item => item.key === key
  )

const sortTaxonomyIdsByType = (taxonomyTypes, taxonomyIds) => {
  let sorted = []
  for (let type of taxonomyTypes) {
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

  mainTaxonomyKey
    ? clause._and.push({
        taxonomy_items: { taxonomy: { key: { _ilike: mainTaxonomyKey } } },
      })
    : null

  if (selectedTaxonomyIds.length >= 1) {
    const sortedTax = sortTaxonomyIdsByType(taxonomyTypes, selectedTaxonomyIds)
    for (let type in sortedTax) {
      if (sortedTax[type].length >= 1) {
        clause._and.push({
          taxonomy_items: { taxonomy_id: { _in: sortedTax[type] } },
        })
      }
    }
  }

  return clause
}
