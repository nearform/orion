import React, { useEffect } from 'react'
import T from 'prop-types'
import {
  ButtonBase,
  CircularProgress,
  Button,
  Typography,
} from '@material-ui/core'
import classnames from 'classnames'
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate'
import useImageUpload from '../hooks/useImageUpload'

const UploadImage = ({
  path,
  value,
  aspectRatio,
  onChange,
  onUpload,
  alwaysShowBox,
  children,
  generateFileName,
  classes, // eslint-disable-line react/prop-types
}) => {
  const {
    ImageInput,
    startImageUpload,
    uploadProgress,
    imageURL,
    hasImage,
    isLoading,
  } = useImageUpload({
    path,
    onChange,
    value,
    generateFileName,
  })

  useEffect(() => {
    onUpload(imageURL)
  }, [imageURL, onUpload])

  const imageStyles = { backgroundImage: `url(${imageURL})` }

  return (
    <>
      <ImageInput />
      {children ? (
        typeof children === 'function' ? (
          children({ startImageUpload, isLoading, uploadProgress })
        ) : (
          children
        )
      ) : (
        <div className={classes.root}>
          {hasImage || isLoading || alwaysShowBox ? (
            <ButtonBase
              focusRipple
              disabled={isLoading}
              className={classnames(
                {
                  alwaysShowBox: alwaysShowBox && !hasImage,
                },
                'upload-image-base'
              )}
              style={{ paddingTop: `${aspectRatio * 100}%` }}
              focusVisibleClassName={classes.focusVisible}
              onClick={startImageUpload}
            >
              <span
                className="upload-image-src"
                style={imageStyles}
                data-testid={imageURL}
              />

              <span className="upload-image-backdrop" />
              <span className="upload-image-button">
                <Typography
                  component="span"
                  className={classnames(
                    classes.imageTitle,
                    classes.addPhotoButton,
                    'upload-image-typography'
                  )}
                >
                  <AddPhotoIcon />
                  {hasImage ? 'Replace' : 'Upload Image'}
                </Typography>
                {isLoading && (
                  <CircularProgress
                    variant="determinate"
                    className="upload-image-progress"
                    value={uploadProgress}
                  />
                )}
              </span>
            </ButtonBase>
          ) : (
            <Button
              variant="contained"
              className="add-photo-button"
              onClick={startImageUpload}
            >
              <AddPhotoIcon />
              Upload Image
            </Button>
          )}
        </div>
      )}
    </>
  )
}

UploadImage.propTypes = {
  path: T.string.isRequired,
  children: T.func,
  value: T.string,
  onChange: T.func,
  onUpload: T.func,
  aspectRatio: T.number,
  alwaysShowBox: T.bool,
  generateFileName: T.bool,
}

UploadImage.defaultProps = {
  children: undefined,
  value: undefined,
  onChange: undefined,
  onUpload: () => {},
  aspectRatio: 0.5,
  alwaysShowBox: false,
  generateFileName: false,
}

export default UploadImage
