import { Storage } from 'aws-amplify'
import { sha256 } from 'js-sha256'

class AmplifyCKEUploadAdapter {
  constructor(loader, path) {
    this.loader = loader
    this.path = path
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(async file => {
      const ext = file.name.split('.').pop()
      const { key: s3Key } = await Storage.put(
        `${this.path}/cke_${sha256(`${file.name}${Date.now()}`)}.${ext}`,
        file,
        {
          progressCallback({ loaded, total }) {
            this.loader.uploadTotal = total
            this.loader.uploaded = loaded
          },
          level: 'public',
        }
      )
      const raw_url = await Storage.get(s3Key, { level: 'public' })
      const { origin, pathname } = new URL(raw_url)
      return {
        default: origin + pathname,
      }
    })
  }

  // Aborts the upload process.
  abort() {}
}

export function getCKEUploaderPlugin(path) {
  return editor => {
    editor.plugins.get('FileRepository').createUploadAdapter = loader =>
      new AmplifyCKEUploadAdapter(loader, path)
  }
}
