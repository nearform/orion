module.exports = `
{
  raw_salmon {
    article(where: { status: { _eq: "published" } }) {
      primary_taxonomy: taxonomy_items(
        limit: 1
        order_by: { taxonomy: { taxonomy_type: { order_index: asc } } }
      ) {
        taxonomy {
          name
          key
        }
      }
      rating: article_ratings_aggregate {
        aggregate {
          count
          avg {
            rating
          }
        }
      }
      taxonomy_items {
        taxonomy_id
      }
      thumbnail
      title
      summary
      subtitle
      authors {
        author {
          first_name
          last_name
          title
          id
          email
        }
      }
      banner
      published_at
      path
      id
    }
  }
}
`
