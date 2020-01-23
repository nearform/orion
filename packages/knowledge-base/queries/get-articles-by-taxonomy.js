module.exports = `
query getArticlesByTaxonomy($taxonomy:String!) {
  orion {
    article(where: {
      _and: [
        { status: { _eq: "published" } },
        { taxonomy_items: { taxonomy: { key: { _ilike: $taxonomy } } } }
      ]
    }) {
      id
      thumbnail
      title
      summary
      created_at
      published_at
      updated_at
      status
      primary_taxonomy: taxonomy_items(
        limit: 1
        order_by: { taxonomy: { taxonomy_type: { order_index: asc } } }
      ) {
        taxonomy {
          name
          key
        }
      }
      taxonomy_items {
        taxonomy_id
      }
      createdBy {
        first_name
        last_name
      }
      knowledge_type
      path
      editors_pick
    }
    article_aggregate(where: {
      _and: [
        { status: { _eq: "published" } },
        { taxonomy_items: { taxonomy: { key: { _ilike: $taxonomy } } } }
      ]
    }) {
      aggregate {
        count
      }
    }
  }
}
`
