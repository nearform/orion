import React from 'react'
import { withStyles, TextField as MUITextField } from '@material-ui/core'
import classnames from 'classnames'
import T from 'prop-types'

const videoUrlValidators = [
  {
    type: 'Vimeo',
    regex: /https:\/\/vimeo\.com\/(?<id>\d{8,})(?=\b|\/)/,
    getEmbedUrl: (match, regex) =>
      match.input.replace(regex, 'https://player.vimeo.com/video/$<id>'),
  },
  {
    type: 'YouTube',
    regex: /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)(?<id>[^#&?]{11}).*/,
    getEmbedUrl: (match, regex) =>
      match.input.replace(
        regex,
        'https://www.youtube.com/embed/$<id>?enablejsapi=1'
      ),
  },
]

export function getVideoObject(url) {
  if (url) {
    for (const { regex, type, getEmbedUrl } of videoUrlValidators) {
      const match = url.match(regex)
      if (match) {
        return {
          url,
          embedUrl: getEmbedUrl(match, regex),
          type,
        }
      }
    }
  }
  return null
}

const EmbededVideo = ({ url, classes, className }) => {
  const videoObj = getVideoObject(url)
  if (!videoObj) return null //todo do something better, like no-video orsmth?
  return (
    <div className={classnames(classes.root, className)}>
      <iframe frameBorder="0" allowFullScreen src={videoObj.embedUrl} />
    </div>
  )
}

EmbededVideo.propTypes = {
  url: T.string,
  classes: T.object.isRequired,
  className: T.string,
}

export default withStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
    height: 0,
    paddingBottom: '56.25%',
    marginTop: '20px',
    '&>iframe': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
  },
}))(EmbededVideo)
