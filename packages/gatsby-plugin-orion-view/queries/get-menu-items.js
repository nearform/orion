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
      ]
    }) {
      id
      path
      title
      ancestry(where: { direct: { _eq: true }}) {
        ancestor_id
      }
    }
  }
}`
