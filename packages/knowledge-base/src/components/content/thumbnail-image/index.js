import React from 'react'
import T from 'prop-types'
import { makeStyles } from '@material-ui/core'

import narrowFallback from 'efqm-theme/assets/logo-1x'
import wideFallback from 'efqm-theme/assets/logo-3x'

const useThumbnailImageStyles = makeStyles(theme => ({
  wrapper: ({ width, height, src }) => ({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',

    width,
    height,

    backgroundColor: theme.palette.background.light,
    backgroundImage: `url(${src})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  }),
}))

// TODO - replace this with Gatsby Image, when: https://github.com/nearform/raw-salmon/issues/450
// is tackled
const ThumbnailImage = ({ width, height, path }) => {
  // Source the wider logo if the thumbnail is wider than the narrower logo
  const src = path || (parseInt(width, 10) < 70 ? narrowFallback : wideFallback)

  const { wrapper } = useThumbnailImageStyles({ width, height, src })

  return (
    <div className={wrapper} data-test-id="thumbnail-image">
      &nbsp;
    </div>
  )
}

ThumbnailImage.propTypes = {
  width: T.oneOfType([T.number, T.string]),
  height: T.oneOfType([T.number, T.string]),
  path: T.string,
}

export default ThumbnailImage
