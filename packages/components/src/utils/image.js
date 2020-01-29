export const constructImageUrl = path =>
  path === null || path === undefined
    ? null
    : `https://s3.${process.env.GATSBY_AWS_REGION}.amazonaws.com/${process.env.GATSBY_AWS_S3_BUCKET}/public/${path}`
