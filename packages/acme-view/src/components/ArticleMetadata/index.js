import React from 'react'
import T from 'prop-types'
import moment from 'moment'
import { Avatar, withStyles } from '@material-ui/core'
import AccessTime from '@material-ui/icons/AccessTime'
import CalendarToday from '@material-ui/icons/CalendarToday'

function ArticleMetadata({ author, classes, created, readTime, section }) {
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

const styles = theme => ({ ...theme.articleMetadata })

ArticleMetadata.propTypes = {
  author: T.shape({
    image: T.string.isRequired,
    name: T.string.isRequired,
    title: T.string.isRequired,
  }).isRequired,
  classes: T.object,
  created: T.string.isRequired,
  readTime: T.number.isRequired,
  section: T.string.isRequired,
}

export default withStyles(styles, { withTheme: true })(ArticleMetadata)
