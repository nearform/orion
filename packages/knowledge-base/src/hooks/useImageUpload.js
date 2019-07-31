import React, { useRef, useState, useEffect } from 'react'
import { sha256 } from 'js-sha256'
import { Storage } from 'aws-amplify'

function useImageUpload({ path, onChange = () => null, value }) {
  const inputFieldRef = useRef()
  const [imageURL, setImageURL] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [valueCache, setValueCache] = useState(value || null)

  useEffect(() => {
    setValueCache(value)
  }, [value])

  useEffect(() => {
    if (valueCache) {
      Storage.get(valueCache, { level: 'public' }).then(setImageURL)
    } else {
      setImageURL(null)
    }
  }, [valueCache])

  async function handleFileUpload(file) {
    if (!file || !file.name) {
      return
    }
    const ext = file.name.split('.').pop()
    if (valueCache) {
      await Storage.remove(valueCache)
    }
    const { key: s3Key } = await Storage.put(
      `${path}/${sha256(`${file.name}${Date.now()}`)}.${ext}`,
      file,
      {
        progressCallback({ loaded, total }) {
          const currentProgress = (loaded / total) * 100
          setUploadProgress(currentProgress)
        },
        level: 'public',
      }
    )
    setValueCache(s3Key) //set the cached s3 key
    setUploadProgress(0) //remove the progress bar
    onChange(s3Key) //trigger onchange event
  }

  const hasImage = !!valueCache
  const isLoading = !!uploadProgress

  const startImageUpload = () =>
    inputFieldRef.current && inputFieldRef.current.click()

  const ImageInput = () => (
    <input
      accept="image/*"
      ref={inputFieldRef}
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
