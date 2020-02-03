import React from 'react'
import { Box, makeStyles } from '@material-ui/core'
import T from 'prop-types'
import EventItem from '../event-item'
import ListTitle from '../ListTitle'
import column from '../../layout/utils/flex-with-gap/column'

import events from './utils/events'

const useEventListStyles = makeStyles(theme => ({
  wrapper: {
    ...column(theme)(3),
    margin: theme.spacing(2, 0, 0, 0),
    padding: 0,
  },
}))

const EventList = ({ className, component = 'ul' }) => {
  const { wrapper } = useEventListStyles()

  // Don't display events before the cutoff date.
  const eventCutoff = new Date()
  // Set the cutoff date to three days before current date.
  eventCutoff.setDate(eventCutoff.getDate() - 3)

  return (
    <Box className={className}>
      <ListTitle color={['secondary', 'dark']} title="Upcoming Events" />
      <Box className={wrapper} component={component} data-test-id="event-list">
        {events
          .filter(e => Date.parse(e.startTime) > eventCutoff)
          .slice(0, 4)
          .map(event => (
            <EventItem key={event.uid} event={event} />
          ))}
      </Box>
    </Box>
  )
}

EventList.propTypes = {
  component: T.string,
  className: T.string,
}

export default EventList
