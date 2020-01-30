import React from 'react'
import TestRenderer from 'react-test-renderer'

import articleMock from '../../../../__mocks__/article.mock'
import ArticleVisualSummary from './'

jest.mock('../../../utils/image', () => ({
  constructImageUrl: thumbnail => `mocked/${thumbnail}`,
}))

const pPredicate = el => el.type === 'p'
const aPredicate = el => el.type === 'a'

describe('<ArticleVisualSummary />', () => {
  let articleVisualSummary, link

  beforeAll(() => {
    const { path, thumbnail } = articleMock
    articleVisualSummary = TestRenderer.create(
      <ArticleVisualSummary link={`/content/${path}`} thumbnail={thumbnail} />
    ).root
    link = articleVisualSummary.findAll(aPredicate)
  })

  test('base element is a type of <a>', () => {
    expect(link.length).toEqual(1)
  })

  test('link is correct', () => {
    expect(link[0].props.href).toEqual('/content/7-my-first-article')
  })

  test('there is no text', () => {
    expect(articleVisualSummary.findAll(pPredicate).length).toEqual(0)
  })

  describe('image', () => {
    let image

    beforeAll(() => {
      image = articleVisualSummary.findAll(
        el => el.props['data-test-id'] === 'thumbnail-image'
      )
    })

    test('exists', () => {
      expect(image.length).toEqual(1)
    })
  })

  describe('with text added', () => {
    beforeAll(() => {
      const { path, thumbnail } = articleMock
      articleVisualSummary = TestRenderer.create(
        <ArticleVisualSummary
          link={`/content/${path}`}
          thumbnail={thumbnail}
          text="Test Text"
        />
      ).root
    })

    test('the text in <p> is correct', () => {
      const text = articleVisualSummary.findAll(pPredicate)[0].props.children
      expect(text).toEqual('Test Text')
    })
  })

  describe('with link set to false', () => {
    test('doesnt render an a tag', () => {
      const { thumbnail } = articleMock
      articleVisualSummary = TestRenderer.create(
        <ArticleVisualSummary thumbnail={thumbnail} text="Test Text" />
      ).root
      expect(articleVisualSummary.findAll(aPredicate).length).toEqual(0)
    })
  })
})
