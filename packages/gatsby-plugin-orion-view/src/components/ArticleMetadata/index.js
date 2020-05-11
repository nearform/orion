import React from 'react'
import T from 'prop-types'
import moment from 'moment'
import { Avatar, makeStyles } from '@material-ui/core'
import AccessTime from '@material-ui/icons/AccessTime'
import CalendarToday from '@material-ui/icons/CalendarToday'
import { fade } from '@material-ui/core/styles/colorManipulator'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 208,
  },
  author: {
    display: 'flex',
    margin: '8px 4px',
    '& > :first-child': {
      marginRight: 8,
      width: 38,
    },
  },
  data: {
    ...theme.typography.h6,
    color: fade(theme.palette.secondary.main, 0.6),
    display: 'flex',
    margin: '8px 4px',
    '& > :first-child': {
      color: theme.palette.tertiary.main,
      marginRight: 6,
      width: 38,
    },
  },
  name: {
    ...theme.typography.h5,
  },
  section: {
    ...theme.typography.h5,
    borderBottom: '4px solid',
    borderBottomColor: theme.palette.secondary.main,
    marginBottom: 12,
    paddingBottom: 8,
  },
  title: {
    ...theme.typography.h6,
  },
}))

function ArticleMetadata({ author, created, readTime, section }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.section}>{section}</div>
      <div className={classes.author}>
        <Avatar src={author.image} />
        <div>
          <div className={classes.name}>{author.name}</div>
          <div className={classes.title}>{author.title}</div>
        </div>
      </div>
      <div className={classes.data}>
        <CalendarToday />
        {moment(created).format('Do MMM YYYY')}
      </div>
      <div className={classes.data}>
        <AccessTime />
        {readTime} Min Read
      </div>
    </div>
  )
}

ArticleMetadata.propTypes = {
  author: T.shape({
    image: T.string.isRequired,
    name: T.string.isRequired,
    title: T.string.isRequired,
  }).isRequired,
  created: T.oneOfType([T.instanceOf(Date), T.string]),
  readTime: T.number,
  section: T.string.isRequired,
}
ArticleMetadata.defaultProps = {
  readTime: 0,
  created: '',
}

export default ArticleMetadata
