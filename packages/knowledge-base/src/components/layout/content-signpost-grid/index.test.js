import React from 'react'
import TestRenderer from 'react-test-renderer'
import ContentSignpostGrid from '.'

const predicates = {
  root: el => el.type === 'section',
  titleBox: el => el.type === 'div' && el.props['data-test-id'] === 'title',
  list: el => el.type === 'ul' && el.props['data-test-id'] === 'list',
  listItems: el => el.type === 'li',
}

describe('<ContentSignpostGrid />', () => {
  let contentSignpostGrid

  beforeAll(() => {
    contentSignpostGrid = TestRenderer.create(
      <ContentSignpostGrid>
        <div data-test-id="first-element" />
        <div data-test-id="second-element" />
      </ContentSignpostGrid>
    ).root
  })

  test('base element is a type of <section>', () => {
    expect(contentSignpostGrid.findAll(predicates.root).length).toEqual(1)
  })

  test('there is no title as no prop provided', () => {
    expect(contentSignpostGrid.findAll(predicates.titleBox).length).toEqual(0)
  })

  describe('listed children', () => {
    let list

    beforeAll(() => {
      list = contentSignpostGrid.find(predicates.list)
    })

    test('list contains as many items as there are children to the component', () => {
      expect(list.findAll(predicates.listItems).length).toEqual(
        contentSignpostGrid.props.children.length
      )
    })
  })

  describe('rendered with title', () => {
    beforeAll(() => {
      contentSignpostGrid = TestRenderer.create(
        <ContentSignpostGrid title="Test" />
      ).root
    })

    test('will have a title element', () => {
      expect(contentSignpostGrid.findAll(predicates.titleBox).length).toEqual(1)
    })
  })
})
