import React from 'react'
import T from 'prop-types'
import { Box, withStyles } from '@material-ui/core'
import get from 'lodash/get'
import { formatDateAsMonthAndYear } from '../../utils/date'
import ArticleVisualSummary from '../content/article-visual-summary'
import BookmarkButton from '../BookmarkButton'

const ArticlePreview = ({
  article,
  bookmarked,
  bookmarkDisabled,
  onBookmarkToggle,
  classes,
}) => {
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
            {get(article, 'authors[0].author.first_name')}{' '}
            {get(article, 'authors[0].author.last_name')}
          </div>
          <BookmarkButton
            articleId={article.id}
            bookmarked={bookmarked}
            onToggle={onBookmarkToggle}
            disabled={bookmarkDisabled}
          />
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
  bookmarked: T.bool,
  bookmarkDisabled: T.bool,
  onBookmarkToggle: T.func,
}
export default withStyles(styles)(ArticlePreview)
