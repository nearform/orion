import React from 'react'
import { useQuery } from 'graphql-hooks'
import { getArticleDetails } from '../../queries'
import RichText from './RichText'
import ContentMetadata from './ContentMetadata'
import ContentOptions from './ContentOptions'

import { withStyles, Grid, Typography } from '@material-ui/core'
import get from 'lodash/get'

const ViewArticle = ({ classes, slug }) => {
  const contentId = slug.split('-')[0]
  const { data: articleData } = useQuery(getArticleDetails, {
    variables: {
      id: contentId,
    },
  })

  const articleDetails = get(articleData, 'articleDetails')

  //TODO: nicer loading indication
  if (!articleDetails) return null

  return (
    <Grid container spacing={2}>
      <Grid item className={classes.spacer}></Grid>
      <Grid item>
        <ContentMetadata content={articleDetails} />
      </Grid>
      <Grid item xs={6} className={classes.article}>
        <Typography variant="h1">{articleDetails.title}</Typography>
        <Typography variant="h2">{articleDetails.subtitle}</Typography>
        {articleDetails.fields.map(getFieldType)}
      </Grid>
      <Grid item>
        <ContentOptions />
      </Grid>
      <Grid item className={classes.spacer}></Grid>
    </Grid>
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
  spacer: {
    display: 'block',
    width: '88px',
  },
  article: {
    // by default heading 1 maps to h2, heading 2 to h3 etc (but we've customised this to map correctly)
    // see - https://ckeditor.com/docs/ckeditor5/latest/features/headings.html#heading-levels
    // heading 1 and 2 reseved for title and subtitle
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
