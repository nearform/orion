export const readableAuthors = (authorsArray = []) => {
  authorsArray = authorsArray.filter(({ author }) => {
    return (
      // Remove instances of profiles in db with no names
      (author.first_name && author.first_name.length) ||
      (author.last_name && author.last_name.length)
    )
  })
  switch (authorsArray.length) {
    case 0:
      return ''
    case 1:
      return `${authorsArray[0].author.first_name} ${authorsArray[0].author.last_name}`
    case 2:
      return `${authorsArray[0].author.first_name} ${authorsArray[0].author.last_name} & ${authorsArray[1].author.first_name} ${authorsArray[1].author.last_name}`
    default:
      return `${authorsArray[0].author.first_name} ${authorsArray[0].author.last_name} & ${authorsArray.length} others`
  }
}
