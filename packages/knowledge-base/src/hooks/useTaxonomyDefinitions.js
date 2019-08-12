import { useStaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'

const useTaxonomyDefinitions = () => {
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

  return taxonomyTypes
}

export default useTaxonomyDefinitions
