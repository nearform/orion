import { useEffect, useState } from 'react'
import { Storage } from '../utils/amplify'

export default function useAmplifyImage(path) {
  const [imageURL, setImageURL] = useState()
  useEffect(() => {
    if (path) {
      Storage.get(path, { level: 'public' }).then(setImageURL)
    } else {
      setImageURL(null)
    }
  }, [path])

  return imageURL
}
