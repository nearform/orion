module.exports = `{
  orion {
    orion_page(where: {
      published: { _lt: "now()" },
      expires: { _is_null: true }
    }) {
      ancestry {
        ancestor {
          id
          path
          title
        }
        direct
      }
      authors {
        user {
          avatar
          given_name
          id
          title
        }
      }
      contents {
        block
        component
        id
        props
      }
      descendants {
        descendant {
          id
          path
          title
        }
        direct
      }
      tags {
        tag {
          hidden
          tag
        }
      }
      created
      id
      layout
      modified
      path
      published
      show_in_menu
      title
    }
  }
}`
