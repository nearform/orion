module.exports = `{
  orion {
    orion_page(where: {
      _and: {
        published: {_lte: "now()"},
        show_in_menu: {_eq: true},
        path: {_neq: "/"}
      },
      _or: [
        { expires: { _is_null: true } },
        { expires: { _gte: "now()" } }
      ],
      _not: {
        ancestry: {}
      }
    }) {
      descendants(where: {_and: {direct: {_eq: true}, descendant: {show_in_menu: {_eq: true}}}}) {
        descendant {
          id
          path
          title
          descendants(where: {_and: {direct: {_eq: true}, descendant: {show_in_menu: {_eq: true}}}}) {
            descendant {
              id
              path
              title
            }
          }
        }
      }
      id
      path
      title
    }
  }
}`
