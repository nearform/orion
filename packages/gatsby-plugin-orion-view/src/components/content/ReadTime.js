import React from 'react'
import T from 'prop-types'
import { withStyles, Typography } from '@material-ui/core'
import { Schedule } from '@material-ui/icons'

const getTimeToRead = fields => {
  let readTime = 0
  fields
    .filter(({ value }) => Boolean(value))
    .forEach(field => {
      switch (field.type) {
        case 'rich-text':
          readTime = Math.ceil(field.value.split(' ').length / 225)
          break
        default:
          break
      }
    })
  return readTime
}

const ReadTime = ({ classes, fields }) => {
  return (
    <div className={classes.wrapper}>
      <Schedule fontSize="small" />
      <Typography variant="h4" className={classes.snippet}>
        {getTimeToRead(fields)} MIN READ
      </Typography>
    </div>
  )
}

ReadTime.propTypes = {
  classes: T.object.isRequired,
  fields: T.array.isRequired,
}

export default withStyles(theme => ({
  wrapper: {
    color: theme.palette.tertiary.main,
  },
  snippet: {
    color: theme.palette.secondary.main,
    verticalAlign: '0.5em',
    padding: '0px 0px 0px 12px',
    display: 'inline',
  },
}))(ReadTime)
