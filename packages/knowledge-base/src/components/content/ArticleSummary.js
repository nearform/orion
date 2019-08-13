import React from 'react'
import { Link } from 'gatsby'
//import Img from 'gatsby-image'
import BookmarkButton from '../BookmarkButton'
import RichText from './RichText'
import { ImagePlaceholder } from 'components'
import { constructImageUrl } from '../../utils/image'
import { formatDateAsMonthAndYear } from '../../utils/date'
import { withStyles, Grid, Typography } from '@material-ui/core'
import get from 'lodash/get'

const ArticleSummary = ({ classes, article }) => {
  return (
    <Grid container spacing={1} className={classes.summaryObj}>
      <Grid item xs={3}>
        <Link to={`/content/${article.path}`}>
          <img
            src={constructImageUrl(article.thumbnail) || ImagePlaceholder()}
            width="100%"
            height="auto"
          />
          <div className={classes.topicBox}>
            <Typography variant="h3">
              {get(article, 'primary_taxonomy[0].taxonomy.name') || 'No Topic'}
            </Typography>
          </div>
        </Link>
      </Grid>
      <Grid item className={classes.articleSummary} xs={9}>
        <Link to={`/content/${article.path}`}>
          <Typography variant="h2">{article.title || 'No Title'}</Typography>
        </Link>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={3}>
            <Typography variant="h4">
              {formatDateAsMonthAndYear(article.created_at)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4" className={classes.subtle}>
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
    height: theme.spacing(25),
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
    fontSize: '11px',
    fontWeight: 'bold',
    letterSpacing: '1.23px',
    color: theme.palette.secondary.main,
    margin: theme.spacing(0.5),
  },
  topicBox: {
    width: '73%',
    height: theme.spacing(5),
    backgroundColor: theme.palette.primary.main,
    position: 'relative',
    top: '-33px',
    '& h3': {
      fontSize: '12px',
      fontWeight: '900',
      letterSpacing: '2.45px',
      color: 'white',
      textTransform: 'uppercase',
      padding: '12px 8px',
    },
  },
  articleSummary: {
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
      margin: theme.spacing(0.5),
    },
    '& p': {
      height: '64px',
      overflow: 'hidden',
      fontSize: '14px',
      letterSpacing: '-0.15px',
      margin: '2px 4px',
    },
  },
}))(ArticleSummary)
