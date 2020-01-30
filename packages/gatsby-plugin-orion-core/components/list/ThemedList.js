import React from 'react'
import PropTypes from 'prop-types'
import { Box, makeStyles } from '@material-ui/core'
import SmallPreview from './SmallPreview'
import ListTitle from './ListTitle'
import column from '../layout/flex-with-gap/column'

const useThemedListStyles = makeStyles(theme => ({
  listLayout: {
    ...column(theme)(4),
    padding: `${theme.spacing(2)}px 0 0 0`,
    '& li': {
      listStyle: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(3),
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
