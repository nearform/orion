import React from 'react'
import TestRenderer from 'react-test-renderer'
import PageSection from './'

describe('<PageSection />', () => {
  let pageSectionWrapper
  let pageSection

  beforeAll(() => {
    pageSectionWrapper = TestRenderer.create(
      <PageSection color={['palette', 'path']}>
        <div data-test-id="dummy-child" />
      </PageSection>
    )
    pageSection = pageSectionWrapper.root.find(
      el => el.props['data-test-id'] === 'page-section'
    )
  })
  // `xit` used because of this issue: https://github.com/nearform/raw-salmon/issues/627
  xit('base element is a type of <section>', () => {
    expect(pageSection._fiber.child.type).toEqual('section')
  })

  xit('children is rendered as expected', () => {
    const children = pageSection.find(
      el => el.props['data-test-id'] === 'dummy-child'
    )
    expect(children.type).toEqual('div')
  })
})
