import React from 'react'
import { useQuery } from 'graphql-hooks'
import { getTaxonomyTypes, getArticleDetails } from '../../queries'
import { UserAvatar } from 'components'
import { withStyles, Grid, Typography } from '@material-ui/core'
import get from 'lodash/get'
import RichText from './RichText'

const ViewArticle = ({ classes, slug }) => {
  const contentId = slug.split('-')[0]
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
    <Grid container spacing={7} className={classes.sidebar}>
      <Grid item xs={3}>
        <Grid
          container
          spacing={1}
          className={classes.knowledgeTypeContainer}
          justify="space-between"
        >
          <div>
            <Typography variant="h4">knowledge type</Typography>
            <Typography>{articleDetails.knowledge_type}</Typography>
            {articleDetails.authors.map(({ author }) => (
              <UserAvatar key={author.id} user={author} />
            ))}
            {taxonomyTypes.map(type => (
              <Typography key={type.name} variant="h3">
                {type.name}
              </Typography>
            ))}
          </div>
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h1">{articleDetails.title}</Typography>
        <Typography variant="h2">{articleDetails.subtitle}</Typography>
        {articleDetails.fields.map(getFieldType)}
      </Grid>
      <Grid item xs={1}></Grid>
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

export default withStyles(theme => ({}))(ViewArticle)
