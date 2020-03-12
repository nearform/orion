import React, { useRef, useEffect, useState, useContext } from 'react'
import { Button, Paper } from '@material-ui/core'
import { ExpandMore, ExpandLess } from '@material-ui/icons'

import CloudinaryMediaLibraryContext from './CloudinaryMediaLibraryContext'

function insertHandler(data) {
  console.log('INSERT!', data) // eslint-disable-line no-console
}

export const MediaLibraryModal = ({
  cloudinaryCloudName,
  cloudinaryApiKey,
  cloudinaryUsername,
}) => {
  const ref = useRef()

  const getCloudinaryMediaLibrarySignature = useContext(
    CloudinaryMediaLibraryContext
  )

  useEffect(() => {
    const signature = getCloudinaryMediaLibrarySignature()

    // eslint-disable-next-line no-undef
    window.ml = cloudinary.createMediaLibrary(
      {
        cloud_name: cloudinaryCloudName, // eslint-disable-line camelcase
        api_key: cloudinaryApiKey, // eslint-disable-line camelcase
        username: cloudinaryUsername,
        timestamp: Date.now() / 1000,
        signature,
        button_class: 'MuiButton', // eslint-disable-line camelcase
        button_caption: 'Insert Images', // eslint-disable-line camelcase
      },
      {
        insertHandler,
      },
      ref.current
    )
  }, [])

  return <div ref={ref} />
}

export const MediaLibraryIntegrated = ({
  cloudinaryCloudName,
  cloudinaryApiKey,
  cloudinaryUsername,
}) => {
  const [show, setShow] = useState(false)

  const getCloudinaryMediaLibrarySignature = useContext(
    CloudinaryMediaLibraryContext
  )

  useEffect(() => {
    const signature = getCloudinaryMediaLibrarySignature()

    // eslint-disable-next-line no-undef
    cloudinary.openMediaLibrary(
      {
        cloud_name: cloudinaryCloudName, // eslint-disable-line camelcase
        api_key: cloudinaryApiKey, // eslint-disable-line camelcase
        username: cloudinaryUsername,
        timestamp: Date.now() / 1000,
        signature,
        inline_container: '#orion-media-library', // eslint-disable-line camelcase
        remove_header: true, // eslint-disable-line camelcase
        multiple: false,
      },
      {
        insertHandler,
      }
    )
  }, [])

  return (
    <>
      <Button onClick={() => setShow(!show)}>
        {show ? 'Hide Library' : 'Show Library'}
        {show ? <ExpandMore /> : <ExpandLess />}
      </Button>
      <Paper
        hidden={!show}
        style={{ height: 800, width: '100%' }}
        id="orion-media-library"
      />
    </>
  )
}
