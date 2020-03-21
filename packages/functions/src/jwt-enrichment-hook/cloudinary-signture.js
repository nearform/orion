import hashSha256 from 'js-sha256'

function getCloudinaryMediaLibrarySignature() {
  const timestamp = Math.floor(Date.now() / 1000)
  const tokens = [
    `cloud_name=${process.env.CLOUDINARY_CLOUD_NAME}`,
    `timestamp=${timestamp}`,
    `username=${process.env.CLOUDINARY_USERNAME}`,
  ]

  return {
    signature: hashSha256(
      `${tokens.join('&')}${process.env.CLOUDINARY_API_SECRET}`
    ),
    timestamp,
  }
}

export default getCloudinaryMediaLibrarySignature
