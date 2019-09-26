import React from 'react'
import TestRenderer from 'react-test-renderer'
import EventItem from './'
import events from '../event-list/events'

describe('<EventItem />', () => {
  let eventItemWrapper
  let eventItem

  beforeAll(() => {
    eventItemWrapper = TestRenderer.create(<EventItem event={events[0]} />)
    eventItem = eventItemWrapper.root.find(
      el => el.props['data-test-id'] === 'event-item'
    )
  })

  test('base element is a type of <li>', () => {
    expect(eventItem._fiber.child.type).toEqual('li')
  })
})
