import React, { useContext } from 'react'
import { Cache } from 'aws-amplify'
import get from 'lodash/get'
import classnames from 'classnames'
import {
  withStyles,
  Grid,
  Typography,
  LinearProgress,
  useMediaQuery,
} from '@material-ui/core'
import ContentMetadata from './content/ContentMetadata'
import ContentOptions from './content/ContentOptions'
import FeatureArticles from './list/FeatureArticles'
import HowToAuthenticate from './HowToAuthenticate'
import RichText from './content/RichText'
import {
  AuthContext,
  useAuthorizedQuery,
  PaddedContainer,
  EmbeddedVideo,
} from 'components'
import SEO from './SEO'
import { getArticleDetails, getArticleSummary } from '../queries'
import { constructImageUrl } from '../utils/image'

function ContentView({ slug, classes, articleSummary, preview = false }) {
  const { isAuthInitialized, getUserTokenData } = useContext(AuthContext)
  const { isAuthenticated } = getUserTokenData()

  const isSmUp = useMediaQuery('(min-width:600px)')

  const articlePath = slug || get(articleSummary, 'path', '')
  const contentId = articlePath.split('-')[0]
  // Only show the full article if the user is logged in.
  const showFullArticle = isAuthenticated && isAuthInitialized
  const articleQuery = showFullArticle ? getArticleDetails : getArticleSummary

  const {
    data: article,
    loading,
    refetch: refetchArticle,
  } = useAuthorizedQuery(
    articleQuery,
    { id: contentId },
    {
      onPreFetch: variables =>
        !!variables.id && get(articleSummary, 'id') !== variables.id,
      onFetch: data =>
        showFullArticle ? data.articleDetails : data.articleSummary,
      onNoFetch: (variables, loading) => {
        if (articleSummary) {
          return articleSummary
        }
        if (loading) {
          return {
            id: 0,
            title: 'Loading...',
            subtitle: '',
            authors: [],
            taxonomy_items: [],
            published_at: '',
          }
        }
        return null
      },
    }
  )

  if (!article) {
    return (
      <PaddedContainer>
        <SEO title="Article Not Found" />
        <h1>Not Found</h1>
        <p>Article not found</p>
      </PaddedContainer>
    )
  }

  const readCache = Cache.getItem('readArticles') || []
  const articleId = get(article, 'id')
  if (articleId && readCache.includes(articleId)) {
    const readIds = readCache.slice(0, 2).concat(articleId)
    Cache.setItem('readArticles', readIds)
  }

  return (
    <PaddedContainer>
      <SEO title={`${preview && 'Preview '} ${article.title}`} />
      <Grid container spacing={7} className={classes.mainWrapper}>
        <Grid item xs={12} sm={4} lg={3}>
          <Grid
            container
            spacing={1}
            className={classes.knowledgeTypeContainer}
          >
            <Grid id="content-metadata" item xs>
              <div className={classes.spacingRight}>
                <ContentMetadata content={article} />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          spacing={7}
          xs={12}
          sm={8}
          lg={9}
          alignContent="flex-start"
        >
          <Grid item xs={12} lg={9} className={classes.article}>
            <div className={classes.articleContainer}>
              <LinearProgress
                className={classnames({
                  [classes.loadingBar]: true,
                  show: loading,
                })}
              />
              <Typography variant="h1">{article.title}</Typography>
              <Typography variant="h2">{article.subtitle}</Typography>
              {article.banner && (
                <div className={classes.bannerImageWrapper}>
                  <figure>
                    <img
                      src={constructImageUrl(article.banner)}
                      className={classes.bannerImage}
                      alt=""
                    />
                  </figure>
                </div>
              )}
              {!showFullArticle && <RichText value={article.summary} />}
              {!showFullArticle && <HowToAuthenticate />}

              {showFullArticle &&
                get(article, 'fields', [])
                  .filter(({ value }) => !!value)
                  .map(getFieldType)}
            </div>
          </Grid>
          <Grid item xs={12} lg={3} className={classes.rightToolbar}>
            {showFullArticle && isSmUp && (
              <ContentOptions
                articleData={article}
                refetchArticle={refetchArticle}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.featureArticlesWrapper}>
        <FeatureArticles
          hideEmpty
          title="Further reading"
          articles={get(article, 'recommended_articles', []).map(
            ({ recommended_article }) => recommended_article
          )}
        />
      </div>
    </PaddedContainer>
  )
}

const getFieldType = (field, idx) => {
  switch (field.type) {
    case 'rich-text':
      return <RichText key={idx} {...field} />
    case 'image':
      return <div key={idx} {...field} />
    case 'embed-video-link':
      return <EmbeddedVideo key={idx} url={field.value} {...field} />
  }
}

export default withStyles(theme => ({
  mainWrapper: {
    marginBottom: theme.spacing(),
    marginTop: theme.spacing(1),
  },
  rightToolbar: {
    paddingRight: [0, '!important'],
    paddingLeft: [0, '!important'],
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
  articleContainer: {
    marginTop: theme.spacing(-2.25),
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
  bannerImageWrapper: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
  },
  bannerImage: {
    width: '100%',
  },
  article: {
    '& h1': theme.articleTypography.heading1,
    '& h2': {
      ...theme.articleTypography.heading2,
      marginTop: theme.spacing(0.5),
    },
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
      [theme.breakpoints.down('xs')]: {
        margin: theme.spacing(-2),
      },
      '& img': {
        maxWidth: '100%',
      },
    },
  },
  featureArticlesWrapper: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3),
    },
  },
}))(ContentView)
