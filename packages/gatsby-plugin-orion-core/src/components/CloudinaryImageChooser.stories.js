import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { text } from '@storybook/addon-knobs'
import hashSha256 from 'js-sha256'
import CloudinaryImageChooser from './CloudinaryImageChooser'

storiesOf('MediaLibrary', module)
  .addDecorator(jsxDecorator)
  .add('Modal', () => {
    const [image, setImage] = useState('none')
    const cloudinaryApiSecret = text('Cloudinary API Secret')
    const cloudinaryCloudName = text('Cloudinary cloud name', 'orionacme')
    const cloudinaryUsername = text('Cloudinary username')

    return (
      <>
        <CloudinaryImageChooser
          cloudinaryCloudName={cloudinaryCloudName}
          cloudinaryApiKey={text('Cloudinary API key')}
          cloudinaryUsername={cloudinaryUsername}
          getCloudinarySignature={getCloudinaryMediaLibrarySignature}
          onInsertedImage={setImage}
        />
        <h3>Image</h3>
        {image}
      </>
    )

    function getCloudinaryMediaLibrarySignature() {
      const timestamp = Math.floor(Date.now() / 1000)
      const tokens = [
        `cloud_name=${cloudinaryCloudName}`,
        `timestamp=${timestamp}`,
        `username=${cloudinaryUsername}`,
      ]

      return {
        signature: hashSha256(`${tokens.join('&')}${cloudinaryApiSecret}`),
        timestamp,
      }
    }
  })
