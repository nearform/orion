import { useStaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'

const useTaxonomies = (taxonomyData = []) => {
  const taxonomyQueryResult = useStaticQuery(graphql`
    query {
      raw_salmon {
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
  const taxonomyTypes = get(taxonomyQueryResult, 'raw_salmon.taxonomy_type', [])
  const taxonomyIds = taxonomyData.filter((val, i, a) => a.indexOf(val) === i) // removes duplicates

  for (let type of taxonomyTypes) {
    type.active = false
    for (let item of type.taxonomy_items) {
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
