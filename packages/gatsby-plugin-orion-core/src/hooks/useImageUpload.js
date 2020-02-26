import React, { useRef, useState, useEffect } from 'react'
import { sha256 } from 'js-sha256'
import { Storage } from 'aws-amplify'
import useAmplifyImage from './useAmplifyImage'

function useImageUpload({
  path,
  onChange = () => null,
  value,
  generateFileName = true,
}) {
  const inputFieldRef = useRef()
  const [uploadProgress, setUploadProgress] = useState(0)
  const [valueCache, setValueCache] = useState(value || null)

  useEffect(() => {
    setValueCache(value)
  }, [value])

  const imageURL = useAmplifyImage(valueCache)
  async function handleFileUpload(file) {
    if (!file || !file.name) {
      return
    }

    const ext = file.name.split('.').pop()
    if (valueCache) {
      await Storage.remove(valueCache)
    }

    const { key: s3Key } = await Storage.put(
      generateFileName
        ? `${path}/${sha256(`${file.name}${Date.now()}`)}.${ext}`
        : `${path}.${ext}`,
      file,
      {
        progressCallback,
        level: 'public',
      }
    )
    setValueCache(s3Key) // Set the cached s3 key
    setUploadProgress(0) // Remove the progress bar
    onChange(s3Key) // Trigger onchange event

    function progressCallback({ loaded, total }) {
      const currentProgress = (loaded / total) * 100
      setUploadProgress(currentProgress)
    }
  }

  const hasImage = Boolean(valueCache)
  const isLoading = Boolean(uploadProgress)

  function startImageUpload() {
    return inputFieldRef.current && inputFieldRef.current.click()
  }

  const ImageInput = () => (
    <input
      ref={inputFieldRef}
      accept="image/*"
      type="file"
      style={{ display: 'none' }}
      onChange={event => handleFileUpload(event.target.files[0])}
    />
  )

  return {
    ImageInput,
    startImageUpload,
    uploadProgress,
    imageURL,
    hasImage,
    isLoading,
  }
}

export default useImageUpload
