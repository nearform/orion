import React from 'react'
import { withStyles, Typography } from '@material-ui/core'
import { Schedule } from '@material-ui/icons'

const ReadTime = ({ classes, fields }) => {
  const getTimeToRead = fields => {
    let readTime = 0
    fields.map(field => {
      switch (field.type) {
        case 'rich-text':
          readTime = Math.ceil(field.value.split(' ').length / 225)
      }
    })
    return readTime
  }

  return (
    <div className={classes.wrapper}>
      <Schedule fontSize="small" />
      <Typography variant="h4" className={classes.snippet}>
        {getTimeToRead(fields)} MIN READ
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
    color: theme.palette.secondary.main,
    verticalAlign: '0.5em',
    padding: '0px 0px 0px 12px',
    display: 'inline',
  },
}))(ReadTime)
