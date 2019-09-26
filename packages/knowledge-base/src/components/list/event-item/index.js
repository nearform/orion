import React from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'
import T from 'prop-types'

const useEventItemStyles = makeStyles(theme => ({
  wrapper: {
    color: theme.palette.primary.dark,
    display: 'flex',
  },
}))

const EventItem = ({ component = 'li', event }) => {
  const { wrapper } = useEventItemStyles()
  const { name, startTime, endTime, location, bookingLink, detailsLink } = event

  return (
    <Box className={wrapper} component={component} data-test-id="event-item">
      <Typography>{name}</Typography>
      <Typography>{startTime}</Typography>
      <Typography>{endTime}</Typography>
      <Typography>{location.link}</Typography>
      <Typography>{bookingLink}</Typography>
      <Typography>{detailsLink}</Typography>
    </Box>
  )
}

EventItem.propTypes = {
  component: T.string,
  event: T.object.isRequired,
}

export default EventItem
