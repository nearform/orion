import React from 'react'
import TestRenderer from 'react-test-renderer'
import ThumbnailImage from '.'

jest.mock('efqm-theme/assets/logo-1x', () => '1x-image')
jest.mock('efqm-theme/assets/logo-3x', () => '3x-image')

describe('<ThumbnailImage />', () => {
  let thumbnailImageWrapper
  let thumbnailImage

  beforeAll(() => {
    thumbnailImageWrapper = TestRenderer.create(
      <ThumbnailImage height="140" width="100%" path="/path/to/image" />
    ).root

    thumbnailImage = thumbnailImageWrapper.find(
      el => el.props['data-test-id'] === 'thumbnail-image'
    )
  })

  test('base element is a type of <div>', () => {
    expect(thumbnailImage.type).toEqual('div')
  })

  test('snapshot', () => {
    expect(thumbnailImage).toMatchSnapshot()
  })

  describe('when no path is provided', () => {
    beforeAll(() => {
      thumbnailImageWrapper = TestRenderer.create(
        <ThumbnailImage height="20" width="50" />
      ).root

      thumbnailImage = thumbnailImageWrapper.find(
        el => el.props['data-test-id'] === 'thumbnail-image'
      )
    })

    test('snapshot', () => {
      expect(thumbnailImage).toMatchSnapshot()
    })
  })
})
