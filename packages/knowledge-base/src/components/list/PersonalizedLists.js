import React from 'react'
import { Cache } from 'aws-amplify'
import get from 'lodash/get'
import { useQuery } from 'graphql-hooks'
import { useUserId } from '../../utils/auth'
import { getRandomRows } from '../../utils/array'
import ThemedList from './ThemedList'
import ListTitle from './ListTitle'
import PromoSpot from '../PromoSpot'
import {
  getRecentArticles,
  getBookmarkedArticles,
  getReadArticles,
} from '../../queries'
import { withStyles, Grid } from '@material-ui/core'

function PersonalizedLists({ classes }) {
  const userId = useUserId()
  const readArticleIds = Cache.getItem('readArticles') || []
  const { data: recentArticlesData } = useQuery(getRecentArticles)
  const { data: bookmarkedArticlesData } = useQuery(getBookmarkedArticles, {
    variables: {
      userId: userId,
    },
  })
  const { data: readArticlesData } = useQuery(getReadArticles, {
    variables: {
      ids: readArticleIds,
    },
  })

  //TODO: nicer loading indication
  if (!recentArticlesData || !bookmarkedArticlesData || !readArticlesData)
    return null

  const readArticles =
    readArticlesData.read_articles.length > 0
      ? readArticlesData.read_articles
      : recentArticlesData.recent_articles

  bookmarkedArticlesData.user_bookmarks.flat()
  const bookmarkedArticles =
    bookmarkedArticlesData.user_bookmarks.length > 0
      ? getRandomRows(
          bookmarkedArticlesData.user_bookmarks.map(
            article => article.bookmarked_article
          ),
          3
        )
      : recentArticlesData.recent_articles

  return (
    <Grid item container spacing={3} direction="row">
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} md={3} lg={2}>
          <ListTitle title="Just for you" />
        </Grid>
        <ThemedList
          hideEmpty
          title={
            readArticlesData.read_articles.length > 0
              ? 'Last Read'
              : 'Recent Articles'
          }
          articles={get(
            { read_articles: readArticles.splice(0, 3) },
            'read_articles',
            []
          )}
        />
        <ThemedList
          hideEmpty
          title={
            bookmarkedArticlesData.user_bookmarks.length > 0
              ? 'Bookmarked Articles'
              : 'Recent Articles'
          }
          articles={get(
            { bookmarked_articles: bookmarkedArticles.splice(0, 3) },
            'bookmarked_articles',
            []
          )}
        />
        <PromoSpot />
      </Grid>
    </Grid>
  )
}

const styles = theme => ({
  root: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('lg')]: {
      // Align edge of boxes with article text
      marginLeft: theme.spacing(-3),
    },
  },
})

export default withStyles(styles)(PersonalizedLists)
