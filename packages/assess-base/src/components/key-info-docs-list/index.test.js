import React from 'react'
import TestRenderer from 'react-test-renderer'

import assessment from '../../../__mocks__/assessment.mock'
import KeyInfoDocsList from './'

describe('<KeyInfoDocsList />', () => {
  let keyInfoDocsList, list, listItems

  beforeAll(() => {
    keyInfoDocsList = TestRenderer.create(
      <KeyInfoDocsList assessment={assessment} text="Testing" visible />
    ).root

    list = keyInfoDocsList.find(el => el.type === 'ul')
    listItems = list.findAll(el => el.type === 'li')
  })

  test('renders each assessment file as an li', () => {
    expect(listItems.length).toEqual(assessment.files.length)
  })

  test('the file is passed to the child component', () => {
    const firstListItem = listItems[0]
    const firstFile = assessment.files[0]
    const fileItemComponentProps = firstListItem.props.children.props
    expect(fileItemComponentProps.file).toEqual(firstFile)
  })

  describe('when theres no data yet', () => {
    let defaultKeyInfoDocsList

    beforeAll(() => {
      defaultKeyInfoDocsList = TestRenderer.create(
        <KeyInfoDocsList assessment={undefined} />
      ).root
    })

    test('theres just a bit of text (as well as the heading)', () => {
      expect(
        defaultKeyInfoDocsList.findAll(el => el.type === 'p').length
      ).toEqual(1)
    })
  })
})
