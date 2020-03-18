import React, { useEffect } from 'react'
import T from 'prop-types'
import {
  ButtonBase,
  CircularProgress,
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core'
import classnames from 'classnames'
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate'
import useImageUpload from '../hooks/useImageUpload'
import { fade } from '@material-ui/core/styles/colorManipulator'

const useStyles = makeStyles(theme => ({
  root: {
    '&.add-photo-button': {
      color: theme.palette.action.main,
      backgroundColor: theme.palette.background.default,
      '& .MuiButton-label .MuiSvgIcon-root': {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(-1),
      },
    },
    '&.upload-image-base': {
      position: 'relative',
      height: 0,
      paddingTop: '50%',
      width: '100%',
      color: 'transparent',
      '&:hover, &$focusVisible, &.alwaysShowBox': {
        zIndex: 1,
        color: theme.palette.common.white,
        '& .upload-image-backdrop': {
          opacity: 0.4,
        },
        '& .upload-image-typography': {
          opacity: 1,
        },
      },
      '& .upload-image-src': {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundColor: fade(theme.palette.common.black, 0.5),
      },
      '& .upload-image-backdrop': {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0,
        transition: theme.transitions.create('opacity'),
      },
      '& .upload-image-button': {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.action.main,
        '& .upload-image-typography': {
          // TODO: pickup the article typography from???
          // ...theme.articleTypography.articleEditButton,
          padding: theme.spacing(1, 3),
          borderRadius: theme.spacing(0.5),
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          opacity: 0,
          backgroundColor: theme.palette.background.default,
          transition: theme.transitions.create('opacity'),
          '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(-1),
          },
        },
        '& .upload-image-progress': {
          color: theme.palette.action.main,
          position: 'absolute',
          left: 'calc(50% - 30px)',
          height: '60px !important',
          width: '60px !important',
        },
      },
    },
  },
}))

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

  const classes = useStyles()

  return (
    <div className={classes.root}>
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
    </div>
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
