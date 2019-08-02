import React from 'react'
import PropTypes from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import ArticlePreview from './ArticlePreview'

const FeatureArticles = ({ classes, title = '', articles = [] }) => {
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h3">{title}</Typography>
      </div>
      <div className={classes.articleContainer}>
        {articles.map(article => (
          <ArticlePreview key={article.id} article={article} />
        ))}
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
})

export default withStyles(styles)(FeatureArticles)
