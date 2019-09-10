import React from 'react'
import { Link } from 'gatsby'
import BookmarkButton from '../BookmarkButton'
import RichText from './RichText'
import { constructImageUrl } from '../../utils/image'
import { formatDateAsMonthAndYear } from '../../utils/date'
import { withStyles, Typography, Box } from '@material-ui/core'
import get from 'lodash/get'

const ArticleSummary = ({
  classes,
  article,
  bookmarked,
  onBookmarkToggle,
  bookmarkButtonDisabled,
}) => {
  //TODO: Replace <img> on line 16 with gatsby-image
  return (
    <Box className={classes.summaryObj}>
      <Link
        className={classes.articleImageLink}
        to={`/content/${article.path}`}
      >
        <img
          src={constructImageUrl(article.thumbnail)}
          width="100%"
          height="auto"
        />
        <div className={classes.topicBox}>
          <Typography variant="h3">
            {get(article, 'primary_taxonomy[0].taxonomy.name') || 'No Topic'}
          </Typography>
        </div>
      </Link>
      <Box className={classes.articleSummary}>
        <Link to={`/content/${article.path}`}>
          <Typography className={classes.articleTitle} variant="h2">
            {article.title || 'No Title'}
          </Typography>
        </Link>
        <Box className={classes.articleMeta}>
          <Typography variant="h4">
            {formatDateAsMonthAndYear(article.created_at)}
          </Typography>
          <Typography variant="h4" className={classes.authorTitle}>
            {get(article, 'createdBy.first_name')}{' '}
            {get(article, 'createdBy.last_name')}
          </Typography>
        </Box>
        <RichText
          className={classes.articleSummaryText}
          {...{ value: article.summary || '<p>Summary not available</p>' }}
        />
        <Box alignItems="center" display="flex" flexDirection="row">
          <Link to={`/content/${article.path}`} className={classes.readMore}>
            READ MORE
          </Link>
          <BookmarkButton
            articleId={article.id}
            bookmarked={bookmarked}
            onToggle={onBookmarkToggle}
            disabled={bookmarkButtonDisabled}
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
    color: theme.palette.primary.dark,
    borderBottom: `2px solid ${theme.palette.tertiary.light}`,
    padding: `${theme.spacing(2.5)}px 0 ${theme.spacing(1.5)}px`,
    marginBottom: theme.spacing(1.5),
    '&:last-of-type': {
      marginBottom: 0,
    },
  },
  articleImageLink: {
    flex: '0 0 280px',
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
  highlight: {
    color: theme.palette.secondary.main,
  },
  readMore: {
    fontSize: '11px',
    fontWeight: 'bold',
    letterSpacing: '1.23px',
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(1),
  },
  topicBox: {
    width: '73%',
    backgroundColor: theme.palette.primary.main,
    position: 'relative',
    marginTop: '-33px',
    '& h3': {
      fontSize: '12px',
      fontWeight: '900',
      letterSpacing: '2.45px',
      color: 'white',
      textTransform: 'uppercase',
      padding: theme.spacing(2),
    },
    '&:hover': {
      textDecoration: 'none',
    },
  },
  articleSummary: {
    marginLeft: theme.spacing(2.5),
    '& a': {
      color: theme.palette.secondary.main,
    },
    '& h2': {
      fontSize: '21px',
      fontWeight: 'bold',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: '-0.15px',
      color: theme.palette.primary.dark,
    },
    '& h4': {
      fontSize: '11px',
      fongWeight: 'bold',
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
}))(ArticleSummary)
