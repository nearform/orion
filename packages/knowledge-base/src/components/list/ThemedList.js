import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import SmallPreview from './SmallPreview'
import ListTitle from './ListTitle'

const ThemedList = ({ title = '', articles = [], hideEmpty }) => {
  if (hideEmpty && !articles.length) return null
  return (
    <Box>
      <ListTitle title={title} />
      {articles.map(article => (
        <SmallPreview key={'article_' + article.id} article={article} />
      ))}
    </Box>
  )
}

ThemedList.propTypes = {
  title: PropTypes.string,
  articles: PropTypes.array,
  classes: PropTypes.object,
}

export default ThemedList
