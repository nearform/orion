module.exports = `{
  orion {
    orion_page(
      where: {
        published: {_lt: "now()"},
        expires: {_is_null: true},
        show_in_menu: {_eq: true},
        path: { _neq: "/" }
      }
    ) {
      descendants {
        descendant {
          id
          path
          title
        }
        direct
      }
      id
      path
      show_in_menu
      title
    }
  }
}`
