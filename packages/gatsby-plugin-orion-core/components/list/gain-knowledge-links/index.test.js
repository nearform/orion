import React from 'react'
import TestRenderer from 'react-test-renderer'
import GainKnowledgeLinks from './'

describe('<GainKnowledgeLinks />', () => {
  let gainKnowledgeLinksWrapper
  let gainKnowledgeLinks

  beforeAll(() => {
    gainKnowledgeLinksWrapper = TestRenderer.create(<GainKnowledgeLinks />)
    gainKnowledgeLinks = gainKnowledgeLinksWrapper.root.find(
      el => el.props['data-test-id'] === 'gain-knowledge-links'
    )
  })

  test('base element is a type of <section>', () => {
    expect(gainKnowledgeLinks._fiber.child.type).toEqual('section')
  })

  test('has an H2', () => {
    expect(gainKnowledgeLinks.findAll(el => el.type === 'h2').length).toEqual(1)
  })

  test('there are four images', () => {
    expect(gainKnowledgeLinks.findAll(el => el.type === 'img').length).toEqual(
      4
    )
  })
})
