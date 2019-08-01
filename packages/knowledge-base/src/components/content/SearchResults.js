import React from 'react'
import { useQuery } from 'graphql-hooks'
import { getArticlesSearchResults } from '../../queries'
import { withStyles, Grid } from '@material-ui/core'
//import Taxonomies from './Taxonomies'
import ArticleSummary from './ArticleSummary'

const SearchResults = ({ classes, term }) => {
  const { data: articleData } = useQuery(getArticlesSearchResults, {
    variables: {
      orderBy: { published_at: 'desc' },
      limit: 10,
      offset: 0,
    },
  })

  //TODO: nicer loading indication
  if (!articleData) return null

  return (
    <Grid container spacing={2}>
      <Grid item className={classes.spacer}></Grid>
      <Grid item></Grid>
      <Grid item xs={9} className={classes.article}>
        {articleData.article.map(item => (
          <ArticleSummary key={'article_id_' + item.id} article={item} />
        ))}
      </Grid>
      <Grid item className={classes.spacer}></Grid>
    </Grid>
  )
}

export default withStyles(theme => ({
  spacer: {
    display: 'block',
    width: '88px',
  },
  article: {
    '& h1': theme.articleTypography.heading1,
    '& h2': theme.articleTypography.heading2,
    '& h3': theme.articleTypography.heading3,
    '& h4': theme.articleTypography.heading4,
    '& > p:first-of-type': theme.articleTypography.firstParagraph,
    '& p': theme.articleTypography.paragraph,
    '& ul': theme.articleTypography.bulletedList,
    '& ul li': theme.articleTypography.bulletedListItem,
    '& ol': theme.articleTypography.numberedList,
    '& ol li': theme.articleTypography.numberedListItem,
    '& blockquote': theme.articleTypography.blockquote,
    '& strong': theme.articleTypography.bold,
    '& i': theme.articleTypography.italic,
    '& a': theme.articleTypography.link,
  },
}))(SearchResults)
