export const getTaxonomyItemByKey = (taxonomyTypes, key) => {
  const taxonomyItems = taxonomyTypes.reduce(
    (acc, val) => acc.concat(val.taxonomy_items),
    []
  )
  const match = taxonomyItems.find(item => item.key === key)
  return match !== undefined ? match : { id: 0, key: '', name: '' }
}
