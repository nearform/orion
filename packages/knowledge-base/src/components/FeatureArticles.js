import React from 'react'
import PropTypes from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'

import { getArticleThumbnail } from '../utils/image'
import { formatDateAsMonthAndYear } from '../utils/date'

const FeatureArticles = ({ classes, title = '', articles = [] }) => {
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h3">{title}</Typography>
      </div>
      <div className={classes.articleContainer}>
        {articles.map(article => {
          const thumbnail = getArticleThumbnail(article)
          // TODO Make the article a link
          return (
            <div key={article.id} className={classes.article}>
              <div
                className={classes.articleImage}
                style={{
                  backgroundImage: thumbnail ? `url(${thumbnail})` : undefined,
                }}
              />
              <div className={classes.taxonomyLabel}>
                {/* TODO query taxonomies and display 1st topic */}
              </div>
              <div className={classes.articleTitle}>{article.title}</div>
              <div className={classes.articleMeta}>
                <div className={classes.articleDate}>
                  {formatDateAsMonthAndYear(article.published_at)}
                </div>
                <div className={classes.articleAuthor}>
                  {article.createdBy.first_name} {article.createdBy.last_name}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

FeatureArticles.propTypes = {
  title: PropTypes.string,
  articles: PropTypes.array,
  classes: PropTypes.object,
}

const styles = theme => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(4),
  },
  title: {
    borderTopWidth: '8px',
    borderTopColor: theme.palette.primary.light,
    borderTopStyle: 'solid',
    paddingTop: theme.spacing(0.5),
    flex: 1,
  },
  articleContainer: {
    width: `calc(960px + ${theme.spacing(8)}px)`,
    flexShrink: 0,
    display: 'flex',
  },
  article: {
    marginLeft: theme.spacing(3),
    '&:first-child': {
      marginLeft: theme.spacing(2),
    },
  },
  articleImage: {
    width: '320px',
    height: '160px',
    backgroundColor: theme.palette.background.light,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  taxonomyLabel: {
    width: '255px',
    height: '40px',
    backgroundColor: theme.palette.primary.main,
    marginTop: `-26px`,
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

export default withStyles(styles)(FeatureArticles)
