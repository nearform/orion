import React from 'react'
import T from 'prop-types'
import { Box, makeStyles } from '@material-ui/core'
import { Link } from 'gatsby'

import { constructImageUrl } from '../../../utils/image'

const useLinkStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  image: {
    height: '140px',
  },
  textBox: Object.assign({}, theme.typography.h3, {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
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
  const { image, textBox, wrapper } = useLinkStyles()

  const WrapperComponent = link ? Link : Box
  const props = { className: [className, wrapper].join(' ') }
  if (link) {
    props.to = `/content/${article.path}`
  }

  return (
    <WrapperComponent {...props}>
      <img
        className={image}
        height="auto"
        src={constructImageUrl(article.thumbnail)}
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
