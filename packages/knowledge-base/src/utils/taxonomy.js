export const getTaxonomyItemByKey = (taxonomyTypes, key) => {
  const taxonomyItems = taxonomyTypes.reduce(
    (acc, val) => acc.concat(val.taxonomy_items),
    []
  )
  const match = taxonomyItems.filter(item => item.key === key)
  return match.length > 0 ? match.pop() : { id: 0, key: '', name: '' }
}
