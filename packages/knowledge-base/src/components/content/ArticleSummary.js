import React from 'react'
import { Link } from 'gatsby'
import BookmarkButton from '../BookmarkButton'
import RichText from './RichText'
import { formatDateAsMonthAndYear } from '../../utils/date'
import { withStyles, Grid, Typography } from '@material-ui/core'

const ArticleSummary = ({ classes, article }) => {
  return (
    <Grid container spacing={1} className={classes.summaryObj}>
      <Grid item xs={3}>
        <img
          src={article.banner || 'https://via.placeholder.com/280x140.png'}
          width="100%"
          height="auto"
        />
        <div className={classes.topicBox}>
          <Typography variant="h2">Geopolitics</Typography>
        </div>
      </Grid>
      <Grid item className={classes.articleSummary} xs={9}>
        <Typography variant="h1">{article.title || 'No Title'}</Typography>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={3}>
            <Typography variant="h3">
              {formatDateAsMonthAndYear(article.created_at)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3" className={classes.subtle}>
              {article.createdBy.first_name} {article.createdBy.last_name}
            </Typography>
          </Grid>
        </Grid>
        <RichText
          {...{ value: article.summary || '<p>Summary not available</p>' }}
        />
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={3}>
            <Link to={`/content/${article.path}`} className={classes.readMore}>
              READ MORE
            </Link>
          </Grid>
          <Grid item>
            <BookmarkButton articleId={article.id} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withStyles(theme => ({
  summaryObj: {
    height: '200px',
    overflow: 'hidden',
    color: theme.palette.primary.dark,
    borderBottom: `1px solid ${theme.palette.tertiary.light}`,
    padding: '20px 0px',
  },
  subtle: {
    color: theme.palette.tertiary.main,
  },
  highlight: {
    color: theme.palette.secondary.main,
  },
  readMore: {
    fontFamily: 'Lato',
    fontSize: '11px',
    fontWeight: 'bold',
    letterSpacing: '1.23px',
    color: theme.palette.secondary.main,
    margin: '4px',
  },
  topicBox: {
    width: '73%',
    height: '40px',
    backgroundColor: theme.palette.primary.main,
    position: 'relative',
    top: '-33px',
    '& h2': {
      fontFamily: 'Lato',
      fontSize: '12px',
      fontWeight: '900',
      letterSpacing: '2.45px',
      color: 'white',
      textTransform: 'uppercase',
      padding: '12px 4px',
    },
  },
  articleSummary: {
    '& h1': {
      fontSize: '21px',
      fontFamily: 'Lato',
      fontWeight: 'bold',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: '-0.15px',
      color: theme.palette.primary.dark,
    },
    '& h3': {
      fontFamily: 'Lato',
      fontSize: '11px',
      fongWeight: 'bold',
      letterSpacing: '1.23px',
      margin: '4px',
    },
    '& p': {
      height: '64px',
      overflow: 'hidden',
      fontFamily: 'Lato',
      fontSize: '14px',
      letterSpacing: '-0.15px',
      margin: '2px 4px',
    },
  },
}))(ArticleSummary)
