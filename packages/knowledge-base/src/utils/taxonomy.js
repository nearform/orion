export const getTaxonomyItemByKey = (taxonomyTypes, key) => {
  const taxonomyItems = taxonomyTypes.reduce(
    (acc, val) => acc.concat(val.taxonomy_items),
    []
  )
  const match = taxonomyItems.find(item => item.key === key)
  return match !== undefined ? match : { id: 0, key: '', name: '' }
}

export const sortTaxonomyIdsByType = (taxonomyTypes, taxonomyIds) => {
  let sorted = []
  for (let type of taxonomyTypes) {
    const matchingIds = type.taxonomy_items.map(item => item.id)
    sorted[type.key] = matchingIds.filter(item => taxonomyIds.includes(item))
  }

  return sorted
}
