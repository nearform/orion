import React from 'react'
import { useQuery } from 'graphql-hooks'
import { getTaxonomyTypes, getArticleDetails } from '../queries'
import { UserAvatar } from 'components'
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
    <Grid container spacing={11}>
      <Grid item className={classes.spacer}></Grid>
      <Grid item xs={3}>
        <div>
          <Typography variant="h4">knowledge type</Typography>
          <Typography variant="h4">{articleDetails.knowledge_type}</Typography>
          {articleDetails.authors.map(({ author }) => (
            <UserAvatar
              key={author.id}
              email={author.email || ''}
              memberType="efqm member"
            />
          ))}
          {taxonomyTypes.map(type => (
            <Typography key={type.name} variant="h3">
              {type.name}
            </Typography>
          ))}
        </div>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="h1">{articleDetails.title}</Typography>
        <Typography variant="h2">{articleDetails.subtitle}</Typography>
        <div dangerouslySetInnerHTML={{ __html: articleDetails.fields.body }} />
      </Grid>
      <Grid item xs={3}>
        RIGHT COLUMN
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
}))(ViewArticle)
