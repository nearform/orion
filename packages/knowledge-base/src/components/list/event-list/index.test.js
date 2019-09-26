import React from 'react'
import TestRenderer from 'react-test-renderer'
import EventList from './'

describe('<EventList />', () => {
  let eventListWrapper
  let eventList

  beforeAll(() => {
    eventListWrapper = TestRenderer.create(<EventList />)
    eventList = eventListWrapper.root.find(
      el => el.props['data-test-id'] === 'event-list'
    )
  })

  test('base element is a type of <ul>', () => {
    expect(eventList._fiber.child.type).toEqual('ul')
  })
})
