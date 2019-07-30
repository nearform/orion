import React, { useRef, useState, useEffect } from 'react'
import { Storage } from 'aws-amplify'
import { sha256 } from 'js-sha256'
import { fade } from '@material-ui/core/styles/colorManipulator'
import {
  ButtonBase,
  CircularProgress,
  Button,
  Typography,
  withStyles,
} from '@material-ui/core'
import classnames from 'classnames'
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate'

function UploadImageWidget({
  path,
  value,
  aspectRatio = 0.5,
  onChange = () => null,
  alwaysShowBox,
  classes,
}) {
  const inputFieldRef = useRef()
  const [imageURL, setImageURL] = useState()
  const [valueCache, setValueCache] = useState(value)

  useEffect(() => {
    setValueCache(value)
  }, [value])

  useEffect(() => {
    if (valueCache) {
      Storage.get(valueCache, { level: 'public' }).then(setImageURL)
    } else {
      setImageURL(null)
    }
  }, [valueCache])

  const [uploadProgress, setUploadProgress] = useState(0)
  async function handleFileUpload(file) {
    const ext = file.name.split('.').pop()
    if (valueCache) {
      await Storage.remove(valueCache)
    }
    const { key: s3Key } = await Storage.put(
      `${path}/${sha256(`${file.name}${Date.now()}`)}.${ext}`,
      file,
      {
        progressCallback({ loaded, total }) {
          const currentProgress = (loaded / total) * 100
          setUploadProgress(currentProgress)
        },
        level: 'public',
      }
    )
    setValueCache(s3Key) //set the cached s3 key
    setUploadProgress(0) //remove the progress bar
    onChange(s3Key) //trigger onchange event
  }

  const hasImage = !!valueCache
  const isLoading = !!uploadProgress

  return (
    <>
      <input
        accept="image/*"
        ref={inputFieldRef}
        type="file"
        className={classes.hiddenInput}
        onChange={event => handleFileUpload(event.target.files[0])}
      />
      <div className={classes.root}>
        {hasImage || isLoading || alwaysShowBox ? (
          <ButtonBase
            disabled={isLoading}
            focusRipple
            className={classnames({
              [classes.image]: true,
              alwaysShowBox: alwaysShowBox && !hasImage,
            })}
            style={{ paddingTop: `${aspectRatio * 100}%` }}
            focusVisibleClassName={classes.focusVisible}
            onClick={() => inputFieldRef.current.click()}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${imageURL})`,
              }}
            />

            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                className={classnames(
                  classes.imageTitle,
                  classes.addPhotoButton
                )}
              >
                <AddPhotoIcon className={classes.addPhotoIcon} />
                {hasImage ? 'Replace' : 'Upload Image'}
              </Typography>
              {isLoading && (
                <CircularProgress
                  variant="determinate"
                  className={classes.progress}
                  value={uploadProgress}
                />
              )}
            </span>
          </ButtonBase>
        ) : (
          <Button
            variant="contained"
            className={classes.addPhotoButton}
            onClick={() => inputFieldRef.current.click()}
          >
            <AddPhotoIcon className={classes.addPhotoIcon} />
            Upload Image
          </Button>
        )}
      </div>
    </>
  )
}

export default withStyles(theme => ({
  hiddenInput: {
    display: 'none',
  },
  image: {
    position: 'relative',
    height: 0,
    paddingTop: '50%',
    width: '100%',
    color: 'transparent',
    '&:hover, &$focusVisible, &.alwaysShowBox': {
      zIndex: 1,
      color: theme.palette.common.white,
      '& $imageBackdrop': {
        opacity: 0.4,
      },
      '& $imageTitle': {
        opacity: 1,
      },
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundColor: fade(theme.palette.common.black, 0.5),
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    opacity: 0,
    transition: theme.transitions.create('opacity'),
  },
  progress: {
    position: 'absolute',
    left: 'calc(50% - 30px)',
    height: '60px !important',
    width: '60px !important',
  },
  addPhotoButton: {
    ...theme.articleTypography.articleEditButton,
    padding: theme.spacing(1, 3),
    borderRadius: theme.spacing(0.5),
  },
  addPhotoIcon: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(-1),
  },
}))(UploadImageWidget)
