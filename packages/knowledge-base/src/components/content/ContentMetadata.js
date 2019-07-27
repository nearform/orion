import React from 'react'
import { useQuery } from 'graphql-hooks'
import { getTaxonomyTypes } from '../../queries'
import { UserAvatar } from 'components'
import { withStyles, Typography } from '@material-ui/core'
import get from 'lodash/get'

const ContentMetadata = ({ classes, content }) => {
  const { data: taxonomyData } = useQuery(getTaxonomyTypes)
  const taxonomyTypes = get(taxonomyData, 'taxonomy_type', [])

  //TODO: nicer loading indication
  if (!taxonomyTypes) return null

  return (
    <div className={classes.wrapper}>
      <Typography variant="h4" color="secondary">
        knowledge type
      </Typography>
      <Typography variant="h3">{content.knowledge_type}</Typography>
      <div className={classes.spacerBar} />
      {content.authors.map(({ author }) => (
        <UserAvatar
          key={author.id}
          user={{
            firstName: author.first_name,
            lastName: author.last_name,
            ...author,
            title: 'efqm member',
          }}
        />
      ))}
      <Typography variant="h3">Bookmark</Typography>
      {taxonomyTypes.map(type => (
        <Typography key={type.name} variant="h3">
          {type.name}
        </Typography>
      ))}
    </div>
  )
}
export default withStyles(theme => ({
  spacerBar: {
    display: 'block',
    width: '264px',
    height: '8px',
    backgroundColor: theme.palette.primary.dark,
  },
  wrapper: {
    width: '304px',
    '&>*': {
      margin: '16px',
    },
  },
}))(ContentMetadata)
