import React from 'react'
import T from 'prop-types'
import { Box, withStyles } from '@material-ui/core'
import get from 'lodash/get'
import { formatDateAsMonthAndYear } from '../../utils/date'
import ArticleVisualSummary from '../content/article-visual-summary'
const ArticlePreview = ({ article, classes }) => {
  return (
    <Box>
      <div key={article.id} className={classes.article}>
        <ArticleVisualSummary
          article={article}
          className={classes.visualSummary}
          text={get(article, 'primary_taxonomy[0].taxonomy.name')}
        />
        <div className={classes.articleTitle}>{article.title}</div>
        <div className={classes.articleMeta}>
          <div className={classes.articleDate}>
            {formatDateAsMonthAndYear(article.published_at)}
          </div>
          <div className={classes.articleAuthor}>
            {get(article, 'createdBy.first_name')}{' '}
            {get(article, 'createdBy.last_name')}
          </div>
        </div>
      </div>
    </Box>
  )
}

const styles = theme => ({
  article: {
    cursor: 'pointer',
  },
  visualSummary: {
    marginBottom: theme.spacing(1),
  },
  articleTitle: theme.editorsPicks.title,
  articleMeta: {
    display: 'flex',
  },
  articleDate: {
    ...theme.editorsPicks.date,
    marginRight: theme.spacing(1),
  },
  articleAuthor: theme.editorsPicks.author,
})

ArticlePreview.propTypes = {
  article: T.shape({
    title: T.string,
    path: T.string,
    published_at: T.string,
    primary_taxonomy: T.arrayOf(
      T.shape({
        taxonomy: T.shape({
          name: T.string,
        }),
      })
    ),
    createdBy: T.shape({
      first_name: T.string,
      last_name: T.string,
    }),
  }),
}
export default withStyles(styles)(ArticlePreview)
