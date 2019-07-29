import React from 'react'
import { withStyles, Typography } from '@material-ui/core'
import { CalendarTodayOutlined } from '@material-ui/icons'

const PublishDate = ({ classes, date }) => {
  return (
    <div className={classes.wrapper}>
      <CalendarTodayOutlined fontSize="small" />
      <Typography variant="h4" className={classes.snippet}>
        {new Date(date).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}{' '}
      </Typography>
    </div>
  )
}

export default withStyles(theme => ({
  wrapper: {
    height: '24px',
    color: theme.articleTableIconColor,
  },
  snippet: {
    color: theme.palette.primary.dark,
    verticalAlign: '0.5em',
    padding: '0px 0px 0px 12px',
    display: 'inline',
  },
}))(PublishDate)
