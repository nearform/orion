import React from 'react'
import { Link } from 'gatsby'
import { withStyles, Typography, Box } from '@material-ui/core'
import BookmarkButton from '../BookmarkButton'
import { formatDateAsMonthAndYear } from '../../utils/date'

import { constructImageUrl } from '../../utils/image'
import { readableAuthors } from '../../utils/fix-strings'
import ThumbnailImage from './thumbnail-image'
import RichText from './RichText'

const CondensedArticleSummary = ({
  classes,
  component = 'li',
  article,
  bookmarked,
  onBookmarkToggle,
  bookmarkButtonDisabled,
  filterText,
}) => {
  return (
    <Box className={classes.summaryObj} component={component}>
      <Box>
        <ThumbnailImage
          height={64}
          width={56}
          path={constructImageUrl(article.thumbnail)}
        />
      </Box>
      <Box className={classes.articleSummary}>
        <Typography
          variant="h4"
          color="secondary"
          className={classes.filterText}
        >
          {filterText}
        </Typography>
        <Link to={`/content/${article.path}`}>
          <Typography className={classes.articleTitle} variant="h2">
            {article.title || 'No Title'}
          </Typography>
        </Link>
        <Box className={classes.articleMeta}>
          <Typography variant="h4">
            {formatDateAsMonthAndYear(article.updated_at)}
          </Typography>
          <Typography variant="h4" className={classes.authorTitle}>
            {readableAuthors(article.authors)}
          </Typography>
        </Box>
        <RichText
          className={classes.articleSummaryText}
          {...{
            value:
              article.summary ||
              article.subtitle ||
              '<p>Summary not available</p>',
          }}
        />
        <Box alignItems="center" display="flex" flexDirection="row">
          <Link to={`/content/${article.path}`} className={classes.readMore}>
            READ MORE
          </Link>
          <BookmarkButton
            forceShowText
            articleId={article.id}
            bookmarked={bookmarked}
            disabled={bookmarkButtonDisabled}
            onToggle={onBookmarkToggle}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default withStyles(theme => ({
  summaryObj: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    padding: theme.spacing(0, 0, 1.5),
    marginBottom: theme.spacing(1.5),
    '&:last-of-type': {
      borderBottom: 'none',
      marginBottom: 0,
    },
  },
  filterText: {
    marginBottom: theme.spacing(1),
  },
  articleMeta: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(2),
  },
  articleSummaryText: {
    marginBottom: theme.spacing(1),
  },
  articleTitle: {
    marginBottom: theme.spacing(1),
  },
  authorTitle: {
    color: theme.palette.tertiary.main,
    marginLeft: theme.spacing(1),
  },
  readMore: {
    fontSize: '11px',
    fontWeight: 'bold',
    letterSpacing: '1.23px',
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(1),
  },
  articleSummary: {
    marginLeft: theme.spacing(1),
    '& a': {
      color: theme.palette.secondary.main,
    },
    '& h2': {
      marginBottom: theme.spacing(0.5),
      fontSize: '14px',
      fontWeight: 'bold',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: '-0.15px',
      color: theme.palette.primary.dark,
    },
    '& h4': {
      fontSize: '11px',
      fontWeight: 'bold',
      letterSpacing: '1.23px',
    },
    '& p': {
      maxHeight: '64px',
      overflow: 'hidden',
      fontSize: '14px',
      letterSpacing: '-0.15px',
      margin: '0',
    },
  },
}))(CondensedArticleSummary)
