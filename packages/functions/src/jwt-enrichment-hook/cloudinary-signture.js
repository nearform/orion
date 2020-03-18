import hashSha256 from 'js-sha256'

function getCloudinaryMediaLibrarySignature() {
  const tokens = [
    `cloud_name=${process.env.CLOUDINARY_CLOUD_NAME}`,
    `timestamp=${Date.now() / 1000}`,
    `username=${process.env.CLOUDINARY_USERNAME}`,
  ]

  return hashSha256(`${tokens.join('&')}${process.env.CLOUDINARY_API_SECRET}`)
}

export default getCloudinaryMediaLibrarySignature
