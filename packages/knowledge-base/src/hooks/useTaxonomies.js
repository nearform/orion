import { useStaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'

const useTaxonomies = (taxonomyData = []) => {
  const taxonomyQueryResult = useStaticQuery(
    graphql`
      query {
        raw_salmon {
          taxonomy_type {
            taxonomy_items {
              id
              key
              name
            }
            order_index
            name
            key
          }
        }
      }
    `
  )
  const taxonomyTypes = get(
    taxonomyQueryResult,
    'raw_salmon.taxonomy_type',
    []
  ).sort((a, b) => a.order_index - b.order_index)

  const taxonomyIds =
    taxonomyData.length > 0
      ? taxonomyData.filter((val, i, a) => a.indexOf(val) === i)
      : []

  let order = 0
  for (let type of taxonomyTypes) {
    order++
    for (let item of type.taxonomy_items) {
      item.order_index = order
      taxonomyIds.find(itemId => itemId === item.id)
        ? (item.active = true)
        : (item.active = false)
    }
  }

  return taxonomyTypes
}

export default useTaxonomies
