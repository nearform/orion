import React from 'react'
import PropTypes from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'

const FeatureArticles = ({ classes, title = '', articles = [] }) => {
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h3">{title}</Typography>
      </div>
      <div className={classes.articleContainer}>
        {articles.map(article => (
          <div key={article.id} className={classes.article}>
            <div className={classes.articleImage} />
            <Typography variant="h4">{article.title}</Typography>
          </div>
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
    // marginRight: theme.spacing(2),
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
  },
})

export default withStyles(styles)(FeatureArticles)
