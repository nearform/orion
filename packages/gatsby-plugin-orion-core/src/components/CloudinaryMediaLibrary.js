import React, { useState } from 'react'
import { Button, Paper, Modal, makeStyles } from '@material-ui/core'
import { PermMedia } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiButton-root': {
      paddingBottom: 8.5,
      paddingTop: 7.5,
      minWidth: 0,
      boxShadow: 'none',
      '& .MuiButton-label': {
        width: 32,
      },
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '& .MuiSvgIcon-root': {
        width: 24,
        height: 24,
      },
    },
  },
  modal: {
    width: '80vw',
    height: '80vh',
    margin: 'auto',
  },
  orionMediaLibrary: {
    width: '100%',
    height: '100%',
  },
}))

const CloudinaryImageChooser = ({
  cloudinaryCloudName,
  cloudinaryApiKey,
  cloudinaryUsername,
  getCloudinarySignature = () => undefined,
  onInsertedImage = () => undefined,
}) => {
  const classes = useStyles()
  const [show, setShow] = useState(false)

  async function openLibrary() {
    const { signature, timestamp } = await getCloudinarySignature()
    const options = {
      cloud_name: cloudinaryCloudName, // eslint-disable-line camelcase
      api_key: cloudinaryApiKey, // eslint-disable-line camelcase
      username: cloudinaryUsername,
      timestamp,
      signature,
      // Setting the container to an element by react ref did not work
      // Cloudinary only rendered when the container was referenced by a selector
      // See: https://cloudinary.com/documentation/media_library_widget#3_set_the_configuration_options
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
    <div className={classes.root}>
      <Button onClick={() => setShow(!show)}>
        <PermMedia />
      </Button>
      <Modal
        open={show}
        className={classes.modal}
        onClose={() => setShow(false)}
        onRendered={() => openLibrary()}
      >
        <Paper className={classes.orionMediaLibrary}>
          <div id="orion-media-library" className={classes.orionMediaLibrary} />
        </Paper>
      </Modal>
    </div>
  )
}

export default CloudinaryImageChooser
