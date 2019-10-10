import { Storage } from 'aws-amplify'
import { sha256 } from 'js-sha256'
import { saveAs } from 'file-saver'

const getFileUri = key => Storage.get(key)

export const uploadFile = (file, assessmentId) => {
  const ext = file.name.split('.').pop()
  return Storage.put(
    `uploads/assessment/${assessmentId}/${sha256(
      `${assessmentId}${file.name}${Date.now()}`
    )}.${ext}`,
    file
  )
}
export const deleteFile = key => Storage.remove(key)

export const downloadFile = async file => {
  const fileUrl = await getFileUri(file.s3_key)
  const response = await fetch(fileUrl)
  const data = await response.blob()
  saveAs(data, file.file_name)
}
