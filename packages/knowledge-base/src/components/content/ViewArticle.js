import React from 'react'
import { useQuery } from 'graphql-hooks'
import { withStyles, Grid, Hidden, Typography } from '@material-ui/core'
import get from 'lodash/get'

import { PaddedContainer } from 'components'
import { getArticleDetails } from '../../queries'
import RichText from './RichText'
import ContentMetadata from './ContentMetadata'
import ContentOptions from './ContentOptions'
import FeatureArticles from '../FeatureArticles'

const ViewArticle = ({ classes, slug }) => {
  const contentId = slug.split('-')[0]
  const { data: articleData, refetch: refetchArticle } = useQuery(
    getArticleDetails,
    {
      variables: {
        id: contentId,
      },
    }
  )

  const articleDetails = get(articleData, 'articleDetails')
  const recomended_articles = get(
    articleDetails,
    'recommended_articles',
    []
  ).map(({ recommended_article }) => recommended_article)
  //TODO: nicer loading indication

  if (!articleDetails) return null

  const ContentOptionsBlock = (
    <ContentOptions
      articleDetails={articleDetails}
      refetchArticle={refetchArticle}
    />
  )
  return (
    <PaddedContainer>
      <Grid
        container
        spacing={2}
        justify="center"
        className={classes.mainWrapper}
      >
        <Grid item xs={12} sm={4} lg={3}>
          <div className={classes.spacingRight}>
            <ContentMetadata content={articleDetails} />
            <Hidden only={['xs', 'lg', 'xl']}>
              <div className={classes.gapAbove}>{ContentOptionsBlock}</div>
            </Hidden>
          </div>
        </Grid>
        <Grid item xs={12} sm={8} lg={6} className={classes.article}>
          <div>
            <Typography variant="h1">{articleDetails.title}</Typography>
            <Typography variant="h2">{articleDetails.subtitle}</Typography>
            {articleDetails.fields
              .filter(({ value }) => !!value)
              .map(getFieldType)}
          </div>
        </Grid>
        <Hidden only={['sm', 'md']}>
          <Grid item xs={12} lg={3}>
            <div className={classes.spacingLeft}>{ContentOptionsBlock}</div>
          </Grid>
        </Hidden>
      </Grid>
      <FeatureArticles title="Further reading" articles={recomended_articles} />
    </PaddedContainer>
  )
}

const getFieldType = field => {
  switch (field.type) {
    case 'rich-text':
      return <RichText {...field} />
    case 'image':
      return <div {...field} />
  }
}

export default withStyles(theme => ({
  mainWrapper: {
    marginBottom: theme.spacing(),
  },
  gapAbove: {
    marginTop: theme.spacing(8),
  },
  spacingLeft: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '25%', // Design has 1/16 spacer column = 25% of 3/12
    },
  },
  spacingRight: {
    // Half-a-column gap in md and above
    [theme.breakpoints.up('md')]: {
      paddingRight: '12.5%',
    },
    [theme.breakpoints.up('lg')]: {
      paddingRight: '16.5%',
    },
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
}))(ViewArticle)
