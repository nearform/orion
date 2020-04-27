const getParentPath = ancestry => {
  const directParent = ancestry.filter(ancestor => ancestor.direct)
  if (directParent.length > 0) {
    return directParent[0].ancestor.path
  }

  return ''
}

export default getParentPath
