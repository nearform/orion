import React from 'react'
import T from 'prop-types'
import { makeStyles } from '@material-ui/core'

import narrowFallback from 'efqm-theme/assets/logo-1x'
import wideFallback from 'efqm-theme/assets/logo-3x'

const useThumbnailImageStyles = makeStyles(theme => ({
  wrapper: ({ width, height }) => ({
    alignItems: 'center',
    backgroundColor: theme.palette.background.light,
    display: 'flex',
    height,
    justifyContent: 'center',
    width,
  }),
}))

// TODO - replace this with Gatsby Image, when: https://github.com/nearform/raw-salmon/issues/450
// is tackled
const ThumbnailImage = ({ width, height, path }) => {
  const { wrapper } = useThumbnailImageStyles({ width, height })

  // Set height and width to accomodate fallback image if path is not set
  const imageHeight = path ? height : 'auto'
  const imageWidth = path ? width : 'auto'

  // Source the wider logo if the thumbnail is wider than the narrower logo
  const src = path || (parseInt(width, 10) < 70 ? narrowFallback : wideFallback)

  return (
    <div className={wrapper} data-test-id="thumbnail-image">
      <img height={imageHeight} src={src} width={imageWidth} />
    </div>
  )
}

ThumbnailImage.propTypes = {
  width: T.oneOfType([T.number, T.string]),
  height: T.oneOfType([T.number, T.string]),
  path: T.string,
}

export default ThumbnailImage
