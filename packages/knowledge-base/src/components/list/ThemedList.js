import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, Grid } from '@material-ui/core'
import ArticlePreview from './ArticlePreview'
import ListTitle from './ListTitle'

const ThemedList = ({ classes, title = '', articles = [], hideEmpty }) => {
  if (hideEmpty && !articles.length) return null
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12} md={3} lg={2}>
        <ListTitle title={title} />
        {articles.map(article => (
          <ArticlePreview key={'article_' + article.id} article={article} />
        ))}
      </Grid>
    </Grid>
  )
}

ThemedList.propTypes = {
  title: PropTypes.string,
  articles: PropTypes.array,
  classes: PropTypes.object,
}

const styles = theme => ({
  root: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('lg')]: {
      // Align edge of boxes with article text
      marginLeft: theme.spacing(-3),
    },
  },
  clip: {
    overflowX: 'hidden',
  },
  title: {
    borderTopWidth: '8px',
    borderTopColor: theme.palette.primary.light,
    borderTopStyle: 'solid',
    paddingTop: theme.spacing(0.5),
  },
})

export default withStyles(styles)(ThemedList)
