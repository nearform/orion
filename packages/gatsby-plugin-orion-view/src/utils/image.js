export const getArticleThumbnail = article => {
  if (!article) return
  if (article.thumbnail) return article.thumbnail
}

export const constructImageUrl = path =>
  path
    ? `https://s3.${process.env.GATSBY_AWS_REGION}.amazonaws.com/${process.env.GATSBY_AWS_S3_BUCKET}/public/${path}`
    : null
