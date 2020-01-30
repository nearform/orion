import { useStaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'

const useKnowledgeTypes = () => {
  const staticResult = useStaticQuery(graphql`
    {
      allKnowledgeTypes(sort: { fields: orderIndex, order: ASC }) {
        nodes {
          name
          key
        }
      }
    }
  `)
  const knowledgeTypes = get(staticResult, 'allKnowledgeTypes.nodes').reduce(
    (acc, { key, name }) => {
      acc[key] = name
      return acc
    },
    {}
  )

  return knowledgeTypes
}

export default useKnowledgeTypes
