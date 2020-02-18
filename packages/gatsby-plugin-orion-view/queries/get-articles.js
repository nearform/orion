module.exports = `{
  orion {
    orion_content(order_by: {date_published: asc}) {
      title
      summary
      subtitle
      date_created
      date_expired
      path
      id
      content
      content_type
      date_modified
      date_published
      hero_img
      parents
      status
    }
  }
}`
