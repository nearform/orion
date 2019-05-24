import T from 'prop-types'

export const fileType = T.shape({
  s3_key: T.string.isRequired,
  file_name: T.string.isRequired,
})
