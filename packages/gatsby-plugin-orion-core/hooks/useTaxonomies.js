import { useStaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'

const useTaxonomies = (taxonomyData = []) => {
  const taxonomyQueryResult = useStaticQuery(graphql`
    query {
      orion {
        taxonomy_type(order_by: [{ order_index: asc }]) {
          name
          key
          taxonomy_items {
            id
            key
            name
          }
        }
      }
    }
  `)
  const taxonomyTypes = get(taxonomyQueryResult, 'orion.taxonomy_type', [])
  const taxonomyIds = taxonomyData.filter((val, i, a) => a.indexOf(val) === i) // Removes duplicates

  for (const type of taxonomyTypes) {
    type.active = false
    for (const item of type.taxonomy_items) {
      if (taxonomyIds.includes(item.id)) {
        item.active = true
        type.active = true
      } else {
        item.active = false
      }
    }
  }

  return taxonomyTypes
}

export default useTaxonomies
