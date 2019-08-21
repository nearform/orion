export const getRandomRows = (source, num) => {
  const results = []
  const origin = source
  while (results.length < num) {
    const i = Math.floor(Math.random() * origin.length)
    results.push(origin[i])
    origin.splice(i, 1)
  }

  return results
}
