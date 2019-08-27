import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import SmallPreview from './SmallPreview'
import ListTitle from './ListTitle'

const ThemedList = ({ title = '', articles = [], hideEmpty }) => {
  if (hideEmpty && !articles.length) return null
  return (
    <Grid item xs={12} md={3} sm={4}>
      <ListTitle title={title} />
      {articles.map(article => (
        <SmallPreview key={'article_' + article.id} article={article} />
      ))}
    </Grid>
  )
}

ThemedList.propTypes = {
  title: PropTypes.string,
  articles: PropTypes.array,
  classes: PropTypes.object,
}

export default ThemedList
