export const getArticleThumbnail = (article, options) => {
  if (!article) return
  if (article.thumbnail) return article.thumbnail
}

export const constructImageUrl = path =>
  `https://s3.${process.env.GATSBY_AWS_REGION}.amazonaws.com/${process.env.GATSBY_AWS_S3_BUCKET}/public/${path}`
