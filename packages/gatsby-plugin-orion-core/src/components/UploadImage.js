import React, { useEffect } from 'react'
import T from 'prop-types'
import {
  ButtonBase,
  CircularProgress,
  Button,
  Typography,
  Box,
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
  isBoxAlwaysShown,
  children,
  isAutoFileNameEnabled,
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
    isAutoFileNameEnabled,
  })

  useEffect(() => {
    onUpload(imageURL)
  }, [imageURL, onUpload])

  const imageStyles =
    imageURL === null ? {} : { backgroundImage: `url(${imageURL})` }

  return (
    <Box className="upload-image-box">
      <ImageInput />
      {children ? (
        typeof children === 'function' ? (
          children({ startImageUpload, isLoading, uploadProgress })
        ) : (
          children
        )
      ) : hasImage || isLoading || isBoxAlwaysShown ? (
        <ButtonBase
          focusRipple
          disabled={isLoading}
          className={classnames(
            {
              alwaysShowBox: isBoxAlwaysShown && !hasImage,
            },
            'upload-image-base'
          )}
          style={{ paddingTop: `${aspectRatio * 100}%` }}
          onClick={startImageUpload}
        >
          <span
            className="upload-image-src"
            style={imageStyles}
            data-testid={imageURL}
          />

          <span className="upload-image-backdrop" />
          <span className="upload-image-button">
            <Typography component="span" className="upload-image-typography">
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
    </Box>
  )
}

UploadImage.propTypes = {
  path: T.string.isRequired,
  children: T.func,
  value: T.string,
  onChange: T.func,
  onUpload: T.func,
  aspectRatio: T.number,
  isBoxAlwaysShown: T.bool,
  isAutoFileNameEnabled: T.bool,
}

UploadImage.defaultProps = {
  children: undefined,
  value: undefined,
  onChange: undefined,
  onUpload: () => {},
  aspectRatio: 0.5,
  isBoxAlwaysShown: false,
  isAutoFileNameEnabled: true,
}

export default UploadImage
