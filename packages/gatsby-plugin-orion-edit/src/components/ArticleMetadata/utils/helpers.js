export const replaceAt = (array, index, value) => {
  const ret = array.slice(0)
  ret[index] = value
  return ret
}
