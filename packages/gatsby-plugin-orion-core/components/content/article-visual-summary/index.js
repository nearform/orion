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

const ArticleVisualSummary = ({ thumbnail, className = '', link, text }) => {
  const { textBox, wrapper } = useLinkStyles()

  const WrapperComponent = link ? Link : Box

  return (
    <WrapperComponent to={link} className={`${className} ${wrapper}`}>
      <ThumbnailImage height={140} path={constructImageUrl(thumbnail)} />
      {text && (
        <Box className={textBox} component="p">
          {text}
        </Box>
      )}
    </WrapperComponent>
  )
}

ArticleVisualSummary.propTypes = {
  thumbnail: T.string,
  link: T.string,
  text: T.string,
  className: T.string, // Allow a class to come in from the parent
}

export default ArticleVisualSummary
