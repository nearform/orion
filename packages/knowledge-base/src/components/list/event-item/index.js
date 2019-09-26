import React from 'react'
import T from 'prop-types'
import moment from 'moment'
import { Box, Button, makeStyles, Typography } from '@material-ui/core'

import column from '../../layout/flex-with-gap/column'
import row from '../../layout/flex-with-gap/row'
import { navigate } from '@reach/router'

const useEventItemStyles = makeStyles(theme => ({
  dateAndTime: {
    ...theme.typography.h4,
    color: theme.palette.secondary.main,
  },
  location: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  text: {
    ...column(theme)(0.5),
    flexBasis: '70%',
    flexGrow: 1,
  },
  wrapper: {
    ...row(theme)(2),
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    '& a': {
      color: theme.palette.primary.dark,
      fontWeight: 700,
    },
  },
}))

const EventItem = ({ component = 'li', event }) => {
  const {
    dateAndTime,
    location: locationStyles,
    name: nameStyles,
    text,
    wrapper,
  } = useEventItemStyles()
  const { name, startTime, endTime, location, bookingLink, detailsLink } = event

  // Note that this can be got from a translation file
  const dateFormat = 'MMMM D - kk:mm'

  return (
    <Box className={wrapper} component={component} data-test-id="event-item">
      <Box className={text}>
        <Typography className={nameStyles} component="h3">
          <a href={detailsLink}>{name}</a>
        </Typography>
        <Typography className={dateAndTime}>
          {moment(startTime).format(dateFormat)} -{' '}
          {moment(endTime).format(dateFormat)}
        </Typography>
        <a className={locationStyles} href={location.link}>
          {location.text}
        </a>
      </Box>
      <Button
        color="secondary"
        variant="outlined"
        onClick={() => {
          navigate(bookingLink)
        }}
      >
        Register
      </Button>
    </Box>
  )
}

EventItem.propTypes = {
  component: T.string,
  event: T.object.isRequired,
}

export default EventItem
