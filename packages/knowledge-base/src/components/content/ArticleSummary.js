import React from 'react'
import BookmarkButton from '../BookmarkButton'
import RichText from './RichText'
import { withStyles, Grid, Typography } from '@material-ui/core'

const ArticleSummary = ({ classes, article }) => {
  return (
    <Grid container spacing={1}>
      <Grid item className={classes.imageBlock} xs={3}></Grid>
      <Grid item className={classes.article} xs={9}>
        <Typography variant="h1">{article.title}</Typography>
        <Typography variant="h4">
          {article.updated_at} {article.createdBy.first_name}{' '}
          {article.createdBy.last_name}
        </Typography>
        <RichText {...{ value: article.summary }} />
        <Typography variant="h4">READ MORE</Typography>
        <BookmarkButton articleId={article.id} />
      </Grid>
    </Grid>
  )
}

export default withStyles(theme => ({
  summaryObj: {
    height: '200px',
  },
  imageBlock: {
    height: '200px',
    border: '1px solid #333',
    display: 'inline-block',
  },
  article: {
    display: 'inline-block',
    overflow: 'hidden',
    height: '200px',
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
}))(ArticleSummary)
