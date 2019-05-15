import { Storage } from 'aws-amplify'
import { sha256 } from 'js-sha256'

export const uploadFile = (file, assessmentId) => {
  const ext = file.name.split('.').pop()
  return Storage.put(
    `uploads/assessment/${assessmentId}/${sha256(
      `${assessmentId}${file.name}${Date.now()}`
    )}.${ext}`,
    file
  )
}

export const getFileUri = key => Storage.get(key)
