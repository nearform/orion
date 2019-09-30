import React from 'react'
import T from 'prop-types'
import { Box, makeStyles } from '@material-ui/core'
import { Link } from 'gatsby'

import { constructImageUrl } from '../../../utils/image'
import ThumbnailImage from '../thumbnail-image'

const useLinkStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  textBox: Object.assign({}, theme.typography.h3, {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    marginBottom: '0',
    marginTop: '-33px',
    padding: theme.spacing(2),
    width: '85%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
}))

const ArticleVisualSummary = ({
  article,
  className = '',
  link = true,
  text,
}) => {
  const { textBox, wrapper } = useLinkStyles()

  const WrapperComponent = link ? Link : Box

  // Build up some dynamic props, with an optional classname prop and `to`
  // if it's a link
  const props = { className: [className, wrapper].join(' ') }
  if (link) {
    props.to = `/content/${article.path}`
  }

  const { thumbnail } = article

  return (
    <WrapperComponent {...props}>
      <ThumbnailImage
        height={140}
        path={constructImageUrl(thumbnail)}
        width="100%"
      />
      {text && (
        <Box className={textBox} component="p">
          {text}
        </Box>
      )}
    </WrapperComponent>
  )
}

ArticleVisualSummary.propTypes = {
  article: T.object.isRequired,
  className: T.string, // Allow a class to come in from the parent
  link: T.bool, // Makes the summary into a link
  text: T.string,
}

export default ArticleVisualSummary
