import React from 'react'
import { UserAvatar } from 'components'
import PublishDate from './PublishDate'
import ReadTime from './ReadTime'
import Taxonomies from './Taxonomies'
import BookmarkButton from '../BookmarkButton'
import { withStyles, Typography } from '@material-ui/core'
import useKnowledgeTypes from '../../hooks/useKnowledgeTypes'

const ContentMetadata = ({ classes, content }) => {
  const knowledgeTypes = useKnowledgeTypes()
  return (
    <div className={classes.wrapper}>
      <Typography variant="h4" color="secondary">
        knowledge type
      </Typography>
      <Typography variant="h3">
        {knowledgeTypes[content.knowledge_type]}
      </Typography>
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
      <PublishDate date={content.created_at} />
      <ReadTime fields={content.fields} />
      <BookmarkButton articleId={content.id} />
      <Taxonomies items={content.taxonomy_items} showAll={false} />
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
      marginTop: '16px',
    },
    '& h3': {
      color: theme.palette.primary.dark,
    },
  },
}))(ContentMetadata)
