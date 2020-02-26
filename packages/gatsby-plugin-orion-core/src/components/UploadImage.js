import React, { useEffect } from 'react'
import T from 'prop-types'
import {
  ButtonBase,
  CircularProgress,
  Button,
  Typography,
  withStyles,
} from '@material-ui/core'
import { fade } from '@material-ui/core/styles/colorManipulator'
import classnames from 'classnames'
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate'
import useImageUpload from '../hooks/useImageUpload'

function UploadImageWidget({
  path,
  value,
  aspectRatio = 0.5,
  onChange,
  onUpload = () => {},
  alwaysShowBox,
  classes,
  children,
  generateFileName,
}) {
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
              className={classnames({
                [classes.image]: true,
                alwaysShowBox: alwaysShowBox && !hasImage,
              })}
              style={{ paddingTop: `${aspectRatio * 100}%` }}
              focusVisibleClassName={classes.focusVisible}
              onClick={startImageUpload}
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
              className="add-photo-button"
              onClick={startImageUpload}
            >
              <AddPhotoIcon className={classes.addPhotoIcon} />
              Upload Image
            </Button>
          )}
        </div>
      )}
    </>
  )
}

UploadImageWidget.propTypes = {
  path: T.string.isRequired,
  children: T.func,
  value: T.string,
  onChange: T.func,
  onUpload: T.func,
  classes: T.object.isRequired,
  aspectRatio: T.number,
  alwaysShowBox: T.bool,
  generateFileName: T.bool,
}

export default withStyles(theme => ({
  image: {
    // Position: 'relative',
    // height: 0,
    // paddingTop: '50%',
    // width: '100%',
    // color: 'transparent',
    // '&:hover, &$focusVisible, &.alwaysShowBox': {
    //   zIndex: 1,
    //   color: theme.palette.common.white,
    //   '& $imageBackdrop': {
    //     opacity: 0.4,
    //   },
    //   '& $imageTitle': {
    //     opacity: 1,
    //   },
    // },
  },
  imageButton: {
    // Position: 'absolute',
    // left: 0,
    // right: 0,
    // top: 0,
    // bottom: 0,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
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
    // ...theme.articleTypography.articleEditButton,
    // padding: theme.spacing(1, 3),
    // borderRadius: theme.spacing(0.5),
  },
  addPhotoIcon: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(-1),
  },
}))(UploadImageWidget)
