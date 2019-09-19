import React from 'react'
import TestRenderer from 'react-test-renderer'
import HeadedAsidePanel from './'

describe('<HeadedAsidePanel />', () => {
  let headedAsidePanel

  beforeAll(() => {
    headedAsidePanel = TestRenderer.create(
      <HeadedAsidePanel title="Test Title">
        <section data-test-id="test-children" />
      </HeadedAsidePanel>
    ).root
  })

  test('base element is a type of <aside>', () => {
    expect(headedAsidePanel.findAll(el => el.type === 'aside').length).toEqual(
      1
    )
  })

  test('creates a heading correctly', () => {
    const heading = headedAsidePanel.find(el => el.type === 'h3')
    expect(heading.props.children).toEqual('Test Title')
  })

  test('children can be found', () => {
    expect(
      headedAsidePanel.findAll(
        el =>
          el.type === 'section' && el.props['data-test-id'] === 'test-children'
      ).length
    ).toEqual(1)
  })
})
