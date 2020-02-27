import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import UploadImage from './UploadImage'
import { Storage } from 'aws-amplify'
import { sha256 } from 'js-sha256'

jest.mock('aws-amplify')
jest.mock('js-sha256')

test('displays button if values is not defined', async () => {
  const { getByText } = render(<UploadImage path="" />)

  const el = getByText('Upload Image')
  const uploadImageButton = el.closest('button')
  expect(uploadImageButton).toBeInTheDocument()
})

test('hidden file input element is in the document', async () => {
  const { container } = render(<UploadImage path="" />)

  const inputEl = container.querySelector('input')
  expect(inputEl).toHaveStyle({ display: 'none' })
})

describe('selecting an image for upload', () => {
  let selectedFile

  function selectImage(props = { path: '' }) {
    const renderResults = render(<UploadImage {...props} />)
    const { container } = renderResults

    // Find the hidden input element
    const inputEl = container.querySelector('input')

    // Simulate selecting an image for upload
    // See: https://github.com/testing-library/react-testing-library/issues/93#issuecomment-403887769
    selectedFile = new File(['(⌐□_□)'], 'chucknorris.png', {
      type: 'image/png',
    })
    Object.defineProperty(inputEl, 'files', {
      value: [selectedFile],
    })
    fireEvent.change(inputEl)

    return renderResults
  }

  function waitForUploadedImage(renderResults) {
    // Once the image is selected, wait for the image span to appear
    return waitForElement(() =>
      renderResults
        .getByText('Replace')
        .closest('button')
        .querySelector('span.upload-image-src')
    )
  }

  beforeEach(async () => {
    jest.resetAllMocks()
    sha256.mockImplementation(v => v)
  })

  test('uploaded image is displayed with url from AWS', async () => {
    expect.assertions(2)

    const expectedImageUrl = 'this/image.png'
    const expectedStorageKey = 'storage key'

    // Mock up the calls to AWS Storage
    Storage.put.mockImplementationOnce(async () => ({
      key: expectedStorageKey,
    }))
    Storage.get.mockImplementationOnce(async () => expectedImageUrl)

    const renderResults = selectImage()
    const uploadImageSpan = await waitForUploadedImage(renderResults)

    expect(uploadImageSpan).toHaveStyle({
      backgroundImage: `url(${expectedImageUrl})`,
    })
    expect(Storage.get).toHaveBeenCalledWith(expectedStorageKey, {
      level: 'public',
    })
  })

  test('image is uploaded to AWS Storage with generated file name', async () => {
    const expectedImageUrl = 'this/image.png'

    // Mock up the calls to AWS Storage
    Storage.put.mockImplementationOnce(async () => ({ key: 'storage key' }))
    Storage.get.mockImplementationOnce(async () => expectedImageUrl)
    sha256.mockImplementationOnce(() => 'sha hash')

    const renderResults = selectImage({ path: 'path1' })
    await waitForUploadedImage(renderResults)

    expect(Storage.put).toHaveBeenCalled()

    const [actualPath, actualFile, actualOptions] = Storage.put.mock.calls[0]
    expect(actualFile).toBe(selectedFile)
    expect(actualPath).toEqual('path1/sha hash.png')
    expect(actualOptions).toMatchObject({ level: 'public' })
  })

  test('generated file name uses a hash of the selected file and a timestamp', async () => {
    const expectedImageUrl = 'this/image.png'

    // Mock up the calls to AWS Storage
    Storage.put.mockImplementationOnce(async () => ({ key: 'storage key' }))
    Storage.get.mockImplementationOnce(async () => expectedImageUrl)
    sha256.mockImplementationOnce(v => v)

    const renderResults = selectImage({ path: 'path1' })
    await waitForUploadedImage(renderResults)

    expect(sha256).toHaveBeenCalled()
    const hashInput = sha256.mock.calls[0][0]
    // The hash input contains a timestamp, we simply assert it contains some digits
    expect(hashInput).toMatch(/chucknorris\.png\d+/)
  })

  test('filename generation can be deactivated', async () => {
    const expectedImageUrl = 'this/image.png'

    // Mock up the calls to AWS Storage
    Storage.put.mockImplementationOnce(async () => ({ key: 'storage key' }))
    Storage.get.mockImplementationOnce(async () => expectedImageUrl)
    sha256.mockImplementationOnce(() => 'sha hash')

    const renderResults = selectImage({
      path: 'path/to/file',
      generateFileName: false,
    })
    await waitForUploadedImage(renderResults)

    expect(Storage.put).toHaveBeenCalled()

    const [actualPath] = Storage.put.mock.calls[0]
    expect(actualPath).toEqual('path/to/file.png')
  })

  test('selecting a new image deletes the previously uploaded image', async () => {
    expect.assertions(5)

    // Mock up the calls to AWS Storage (x2 for each call)
    Storage.put.mockImplementationOnce(async () => ({
      key: 'key1',
    }))
    Storage.put.mockImplementationOnce(async () => ({
      key: 'key2',
    }))
    Storage.get.mockImplementationOnce(async () => 'url1')
    Storage.get.mockImplementationOnce(async () => 'url2')

    const renderResults = selectImage()
    await waitForUploadedImage(renderResults)

    // Find the hidden input element
    const inputEl = renderResults.container.querySelector('input')

    // Overwrite the files property
    selectedFile = new File(['(⌐□_□)'], 'jeanclaude.png', {
      type: 'image/png',
    })
    Object.defineProperty(inputEl, 'files', {
      value: [selectedFile],
    })

    // Fire the change event
    fireEvent.change(inputEl)

    // Wait for the new image element
    // The style should use the url of the second image, url2
    const imageEl = await waitForElement(() =>
      renderResults
        .getByText('Replace')
        .closest('button')
        // Note the style attribute selector
        .querySelector('span.upload-image-src[style*="url2"]')
    )

    expect(imageEl).toBeInTheDocument()

    // Two images should have been uploaded and displayed
    expect(Storage.put).toHaveBeenCalledTimes(2)
    expect(Storage.get).toHaveBeenCalledTimes(2)

    // The initial image should have been removed
    expect(Storage.remove).toHaveBeenCalledWith('key1')

    // The second put should be jeanclaude.png
    expect(Storage.put.mock.calls[1][0]).toMatch('jeanclaude.png')
  })
})
