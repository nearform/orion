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
  ).sort((a, b) => b.order_index - a.order_index)

  const taxonomyIds =
    taxonomyData.length > 0
      ? taxonomyData.filter((val, i, a) => a.indexOf(val) === i)
      : []

  let order = 0
  taxonomyTypes.map(type => {
    order++
    type.taxonomy_items.map(item => {
      if (taxonomyIds.find(itemId => itemId === item.id)) {
        item.active = true
        item.order_index = order
      } else {
        item.active = false
        item.order_index = order
      }
    })
  })

  return taxonomyTypes
}

export default useTaxonomies
