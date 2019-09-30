import React from 'react'
import { Box, makeStyles } from '@material-ui/core'
import T from 'prop-types'
import EventItem from '../event-item'
import ListTitle from '../ListTitle'
import column from '../../layout/flex-with-gap/column'

import events from './events.js'

const useEventListStyles = makeStyles(theme => ({
  wrapper: {
    ...column(theme)(3),
    margin: theme.spacing(2, 0, 0, 0),
    padding: 0,
  },
}))

const EventList = ({ className, component = 'ul' }) => {
  const { wrapper } = useEventListStyles()

  return (
    <Box className={className}>
      <ListTitle color={['secondary', 'dark']} title="Upcoming Events" />
      <Box className={wrapper} component={component} data-test-id="event-list">
        {events
          .filter(e => Date.parse(e.startTime) > Date.parse(new Date()))
          .map(event => (
            <EventItem event={event} key={event.uid} />
          ))}
      </Box>
    </Box>
  )
}

EventList.propTypes = {
  component: T.string,
}

export default EventList