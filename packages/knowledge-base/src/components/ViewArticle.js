import React from 'react'
import { useQuery } from 'graphql-hooks'
import { getTaxonomyTypes, getArticleDetails } from '../queries'
import ContentMetadata from './ContentMetadata'
import { withStyles, Grid, Typography } from '@material-ui/core'
import get from 'lodash/get'

const ViewArticle = ({ classes, contentId }) => {
  const { data: taxonomyData } = useQuery(getTaxonomyTypes)
  const taxonomyTypes = get(taxonomyData, 'taxonomy_type', [])

  const { data: articleData } = useQuery(getArticleDetails, {
    variables: {
      id: contentId,
    },
  })
  const articleDetails = get(articleData, 'articleDetails')

  //TODO: nicer loading indication
  if (!articleDetails || !taxonomyTypes) return null

  return (
    <Grid container spacing={2}>
      <Grid item className={classes.spacer}></Grid>
      <Grid inputMode>
        <ContentMetadata content={articleDetails} />
      </Grid>
      <Grid item xs={6}>
        <Typography className={classes.heading1}>
          {articleDetails.title}
        </Typography>
        <Typography className={classes.heading2}>
          {articleDetails.subtitle}
        </Typography>
        <div
          dangerouslySetInnerHTML={{
            __html: articleDetails.fields.body,
          }}
        />
      </Grid>
      <Grid item>RIGHT COLUMN</Grid>
      <Grid item className={classes.spacer}></Grid>
    </Grid>
  )
}

export default withStyles(theme => ({
  spacer: {
    display: 'block',
    width: '88px',
  },
  ...theme.articleTypography,
}))(ViewArticle)
