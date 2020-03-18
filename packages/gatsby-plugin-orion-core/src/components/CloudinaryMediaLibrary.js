import React, { useState } from 'react'
import { Button, Paper, Modal } from '@material-ui/core'
import { AddAPhoto } from '@material-ui/icons'

const CloudinaryImageChooser = ({
  cloudinaryCloudName,
  cloudinaryApiKey,
  cloudinaryUsername,
  getCloudinarySignature = () => undefined,
  onInsertedImage = () => undefined,
}) => {
  const [show, setShow] = useState(false)

  async function openLibrary() {
    const { signature, timestamp } = await getCloudinarySignature()
    const options = {
      cloud_name: cloudinaryCloudName, // eslint-disable-line camelcase
      api_key: cloudinaryApiKey, // eslint-disable-line camelcase
      username: cloudinaryUsername,
      timestamp,
      signature,
      inline_container: '#orion-media-library', // eslint-disable-line camelcase
      remove_header: true, // eslint-disable-line camelcase
      multiple: false,
    }

    // eslint-disable-next-line no-undef
    cloudinary.openMediaLibrary(options, {
      insertHandler: data => {
        if (data && data.assets && data.assets.length === 1) {
          onInsertedImage(data.assets[0].secure_url)
        }

        setShow(false)
      },
    })
  }

  return (
    <>
      <Button onClick={() => setShow(!show)}>
        <AddAPhoto /> Open Media Library
      </Button>
      <Modal
        open={show}
        style={{
          width: '80vw',
          height: '80vh',
          margin: 'auto',
        }}
        onClose={() => setShow(false)}
        onRendered={() => openLibrary()}
      >
        <Paper
          hidden={!show}
          style={{ height: '100%', width: '100%' }}
          id="orion-media-library"
        />
      </Modal>
    </>
  )
}

export default CloudinaryImageChooser
