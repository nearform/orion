import React from 'react'
import T from 'prop-types'
import { Link } from 'gatsby'
import { Box, withStyles } from '@material-ui/core'
import get from 'lodash/get'
import { formatDateAsMonthAndYear } from 'gatsby-plugin-orion-core/utils'
import ArticleVisualSummary from '../content/article-visual-summary'
import BookmarkButton from '../BookmarkButton'

const ArticlePreview = ({
  article,
  bookmarked,
  bookmarkDisabled,
  onBookmarkToggle,
  classes,
}) => {
  const link = `/content/${article.path}`
  return (
    <Box>
      <div key={article.id} className={classes.article}>
        <ArticleVisualSummary
          link={link}
          thumbnail={article.thumbnail}
          className={classes.visualSummary}
          text={get(article, 'primary_taxonomy[0].taxonomy.name')}
        />
        <Link to={link} className={classes.articleTitle}>
          <div>{article.title}</div>
        </Link>
        <div className={classes.articleMeta}>
          <Link to={link}>
            <div className={classes.articleDate}>
              {formatDateAsMonthAndYear(article.published_at)}
            </div>
            <div className={classes.articleAuthor}>
              {get(article, 'authors[0].author.first_name')}{' '}
              {get(article, 'authors[0].author.last_name')}
            </div>
          </Link>
          <div className={classes.bookmark}>
            <BookmarkButton
              compact
              articleId={article.id}
              bookmarked={bookmarked}
              disabled={bookmarkDisabled}
              onToggle={onBookmarkToggle}
            />
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
    display: 'inline',
  },
  articleDate: {
    ...theme.editorsPicks.date,
    float: 'left',
    marginRight: theme.spacing(1),
  },
  articleAuthor: { ...theme.editorsPicks.author, float: 'left' },
  bookmark: {
    float: 'right',
    marginTop: '-7.5px',
  },
})

ArticlePreview.propTypes = {
  article: T.shape({
    id: T.string,
    thumbnail: T.string,
    title: T.string,
    path: T.string,
    published_at: T.string, // eslint-disable-line camelcase
    // eslint-disable-next-line camelcase
    primary_taxonomy: T.arrayOf(
      T.shape({
        taxonomy: T.shape({
          name: T.string,
        }),
      })
    ),
    createdBy: T.shape({
      first_name: T.string, // eslint-disable-line camelcase
      last_name: T.string, // eslint-disable-line camelcase
    }),
  }),
  bookmarked: T.bool,
  bookmarkDisabled: T.bool,
  onBookmarkToggle: T.func,
  classes: T.object,
}
export default withStyles(styles)(ArticlePreview)
