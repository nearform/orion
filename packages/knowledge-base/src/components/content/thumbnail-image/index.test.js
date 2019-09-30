import React from 'react'
import TestRenderer from 'react-test-renderer'
import ThumbnailImage from './'

jest.mock('efqm-theme/assets/logo-1x', () => '1x-image')
jest.mock('efqm-theme/assets/logo-3x', () => '3x-image')

describe('<ThumbnailImage />', () => {
  let thumbnailImageWrapper, thumbnailImage

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

  describe('<img> tag', () => {
    let imgProps

    beforeAll(() => {
      imgProps = thumbnailImage.find(el => el.type === 'img').props
    })

    test('gets the right props', () => {
      expect(imgProps).toEqual({
        height: '140',
        src: '/path/to/image',
        width: '100%',
      })
    })
  })

  describe('when no path is provided', () => {
    let imgProps

    beforeAll(() => {
      thumbnailImageWrapper = TestRenderer.create(
        <ThumbnailImage height="20" width="50" />
      ).root

      thumbnailImage = thumbnailImageWrapper.find(
        el => el.props['data-test-id'] === 'thumbnail-image'
      )
      imgProps = thumbnailImage.find(el => el.type === 'img').props
    })

    test('width and height are set to auto', () => {
      expect(imgProps.height).toEqual('auto')
      expect(imgProps.width).toEqual('auto')
    })

    test('the src is loaded from the correct module', () => {
      expect(imgProps.src).toEqual('1x-image')
    })
  })
})
