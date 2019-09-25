import React from 'react'
import PropTypes from 'prop-types'
import { Box, makeStyles } from '@material-ui/core'
import SmallPreview from './SmallPreview'
import ListTitle from './ListTitle'

const useThemedListStyles = makeStyles(theme => ({
  listLayout: {
    display: 'flex',
    flexDirection: 'column',
    margin: `${theme.spacing(2)}px 0 0 0`,
    padding: '0',
    '& > *': {
      marginBottom: theme.spacing(4),
    },
    '& > *:last-child': {
      marginBottom: 0,
    },
    '& li': {
      listStyle: 'none',
    },
  },
}))

const ThemedList = ({ title = '', articles = [], hideEmpty }) => {
  const { listLayout } = useThemedListStyles()
  if (hideEmpty && !articles.length) return null
  return (
    <Box>
      <ListTitle title={title} />
      <Box className={listLayout} component="ul">
        {articles.map(article => (
          <SmallPreview key={'article_' + article.id} article={article} />
        ))}
      </Box>
    </Box>
  )
}

ThemedList.propTypes = {
  title: PropTypes.string,
  articles: PropTypes.array,
  classes: PropTypes.object,
}

export default ThemedList
