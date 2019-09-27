import React, { useState, useEffect } from 'react'
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
import SEO from '../components/SEO'
import { PaddedContainer } from 'components'
import { constructImageUrl } from '../utils/image'
import { getArticleDetails } from '../queries'
import { useIsValidUser } from '../utils/auth'

function ContentView({ pageContext: { articleSummary } = {}, slug, classes }) {
  const { path } = articleSummary || { path: slug }
  const isValidUser = useIsValidUser()
  const [getArticleDetailsQuery, { loading, data }] = useManualQuery(
    getArticleDetails
  )

  const [isChanged, setIsChanged] = useState(Symbol())
  const contentId = path.split('-')[0]
  useEffect(() => {
    if (contentId && isValidUser) {
      getArticleDetailsQuery({
        variables: { id: contentId },
      })
    }
  }, [contentId, isValidUser, getArticleDetailsQuery, isChanged])
  const refetchArticle = () => setIsChanged(Symbol())

  const articleFull = get(data, 'articleDetails')
  const articleData = articleFull || articleSummary
  if (!articleData) return null

  const readCache = Cache.getItem('readArticles') || []
  const readIds = readCache.includes(articleData.id)
    ? readCache
    : [articleData.id, ...readCache]
  Cache.setItem(
    'readArticles',
    readIds.length > 3 ? readIds.splice(0, 3) : readIds
  )

  return (
    <PaddedContainer>
      <SEO title={articleData.title} />
      <Grid
        container
        spacing={2}
        justify="flex-end"
        className={classes.mainWrapper}
      >
        <Grid item xs={12} sm={4} lg={3}>
          <div className={classes.spacingRight}>
            <ContentMetadata content={articleData} />
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
            <Typography variant="h1">{articleData.title}</Typography>
            <Typography variant="h2">{articleData.subtitle}</Typography>
            {articleData.banner && (
              <img
                className={classes.bannerImage}
                src={constructImageUrl(articleData.banner)}
                alt=""
              />
            )}
            {!articleFull && <RichText value={articleData.summary} />}
            {!articleFull && <HowToAuthenticate />}
            {get(articleData, 'fields', [])
              .filter(({ value }) => !!value)
              .map(getFieldType)}
          </div>
        </Grid>
        <Grid item xs={12} sm={8} lg={3}>
          <ContentOptions
            articleData={articleData}
            refetchArticle={refetchArticle}
          />
        </Grid>
      </Grid>
      <FeatureArticles
        hideEmpty
        title="Further reading"
        articles={get(articleData, 'recommended_articles', []).map(
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
