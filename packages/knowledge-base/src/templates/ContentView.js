import React, { useContext, useEffect, useState } from 'react'
import { Cache } from 'aws-amplify'
import get from 'lodash/get'
import { useManualQuery } from 'graphql-hooks'
import classnames from 'classnames'
import { withStyles, Grid, Typography, LinearProgress } from '@material-ui/core'

import ContentMetadata from '../components/content/ContentMetadata'
import ContentOptions from '../components/content/ContentOptions'
import FeatureArticles from '../components/list/FeatureArticles'
import HowToAuthenticate from '../components/HowToAuthenticate'
import RichText from '../components/content//RichText'
import { AuthContext, PaddedContainer, EmbeddedVideo } from 'components'
import SEO from '../components/SEO'
import { constructImageUrl } from '../utils/image'
import { getArticleDetails, getArticleSummary } from '../queries'

// A minimal set of article properties to allow the page to render fully.
const EmptyArticle = {
  id: 0,
  title: '',
  subtitle: '',
  authors: [],
  taxonomy_items: [],
  published_at: '',
}

function ContentView({ slug, classes, pageContext }) {
  const { isAuthInitialized, getUserTokenData } = useContext(AuthContext)
  const { isAuthenticated } = getUserTokenData()

  // Only show the full article if the user is logged in.
  const showFullArticle = isAuthenticated && isAuthInitialized
  const articleQuery = showFullArticle ? getArticleDetails : getArticleSummary
  const [fetchArticle, { loading, data }] = useManualQuery(articleQuery)

  const [isChanged, setIsChanged] = useState(Symbol())
  const refetchArticle = () => setIsChanged(Symbol())

  const articlePath = slug || get(pageContext, 'articleSummary.path', '')
  const contentId = articlePath.split('-')[0]

  useEffect(() => {
    if (contentId) {
      fetchArticle({
        variables: { id: contentId },
      })
    }
  }, [contentId, showFullArticle, fetchArticle, isChanged])

  const article =
    get(data, showFullArticle ? 'articleDetails' : 'articleSummary') ||
    get(pageContext, 'articleSummary', EmptyArticle)

  const readCache = Cache.getItem('readArticles') || []
  if (article.id && readCache.includes(article.id)) {
    const readIds = readCache.slice(0, 2).concat(article.id)
    Cache.setItem('readArticles', readIds)
  }

  return (
    <PaddedContainer>
      <SEO title={article.title} />
      <Grid
        container
        spacing={2}
        justify="flex-end"
        className={classes.mainWrapper}
      >
        <Grid id="content-metadata" item xs={12} sm={4} lg={3}>
          <div className={classes.spacingRight}>
            <ContentMetadata content={article} />
          </div>
        </Grid>
        <Grid item xs={12} sm={8} lg={6} className={classes.article}>
          <div>
            <LinearProgress
              className={classnames({
                [classes.loadingBar]: true,
                show: loading,
              })}
            />
            <Typography variant="h1">{article.title}</Typography>
            <Typography variant="h2">{article.subtitle}</Typography>
            {article.banner && (
              <img
                className={classes.bannerImage}
                src={constructImageUrl(article.banner)}
                alt=""
              />
            )}
            {!showFullArticle && (
              <>
                <RichText value={article.summary} />
                <HowToAuthenticate />
              </>
            )}

            {get(article, 'fields', [])
              .filter(({ value }) => !!value)
              .map(getFieldType)}
          </div>
        </Grid>
        {showFullArticle && (
          <Grid item xs={12} sm={8} lg={3}>
            <ContentOptions
              articleData={article}
              refetchArticle={refetchArticle}
            />
          </Grid>
        )}
      </Grid>
      <FeatureArticles
        hideEmpty
        title="Further reading"
        articles={get(article, 'recommended_articles', []).map(
          ({ recommended_article }) => recommended_article
        )}
      />
    </PaddedContainer>
  )
}

const getFieldType = field => {
  switch (field.type) {
    case 'rich-text':
      return <RichText {...field} />
    case 'image':
      return <div {...field} />
    case 'embed-video-link':
      return <EmbeddedVideo url={field.value} {...field} />
  }
}

export default withStyles(theme => ({
  mainWrapper: {
    marginBottom: theme.spacing(),
  },
  loadingBar: {
    marginTop: theme.spacing(-0.5),
    height: theme.spacing(0.5),
    transition: theme.transitions.create('opacity'),
    opacity: 0,
    '&.show': {
      opacity: 1,
    },
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
  bannerImage: {
    marginTop: theme.spacing(2),
    width: '100%',
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
    '& figure': {
      marginLeft: 0,
      marginRight: 0,
      '& img': {
        maxWidth: '100%',
      },
    },
  },
}))(ContentView)
