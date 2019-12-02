import React from 'react'

import ContentView from '../ContentView'

const PreviewArticle = ({ articleId }) => {
  return <ContentView preview slug={articleId} />
}

export default PreviewArticle
