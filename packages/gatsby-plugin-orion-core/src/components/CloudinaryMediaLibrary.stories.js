import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import hashSha256 from 'js-sha256'
import {
  MediaLibraryModal,
  MediaLibraryIntegrated,
} from './CloudinaryMediaLibrary'
import CloudinaryMediaLibraryContext from './CloudinaryMediaLibraryContext'

function getCloudinaryMediaLibrarySignature() {
  const tokens = [
    `cloud_name=${process.env.STORYBOOK_CLOUDINARY_CLOUD_NAME}`,
    `timestamp=${Date.now() / 1000}`,
    `username=${process.env.STORYBOOK_CLOUDINARY_USERNAME}`,
  ]

  return hashSha256(
    `${tokens.join('&')}${process.env.STORYBOOK_CLOUDINARY_API_SECRET}`
  )
}

storiesOf('MediaLibrary', module)
  .addDecorator(jsxDecorator)
  .add('Modal', () => {
    return (
      <CloudinaryMediaLibraryContext.Provider
        value={() => getCloudinaryMediaLibrarySignature()}
      >
        <MediaLibraryModal />
      </CloudinaryMediaLibraryContext.Provider>
    )
  })
  .add('Integrated', () => {
    return (
      <CloudinaryMediaLibraryContext.Provider
        value={() => getCloudinaryMediaLibrarySignature()}
      >
        <MediaLibraryIntegrated
          cloudinaryApiKey={process.env.STORYBOOK_CLOUDINARY_API_KEY}
          cloudinaryCloudName={process.env.STORYBOOK_CLOUDINARY_CLOUD_NAME}
          cloudinaryUsername={process.env.STORYBOOK_CLOUDINARY_USERNAME}
        />
      </CloudinaryMediaLibraryContext.Provider>
    )
  })
