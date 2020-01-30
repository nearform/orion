import React, { useRef } from 'react'
import { RichTextEditor } from 'components'
import { getCKEUploaderPlugin } from '../../../utils/imageUpload'

import debounce from 'lodash/debounce'

const FormikRichTextEditor = ({
  field: { name, value, onChange }, // { name, value, onChange, onBlur }
  articleId,
  ...props
}) => {
  const ref = useRef()
  function dispatchChangeEvent(d) {
    if (ref.current) {
      var ev = new Event('input')
      ev.simulated = true
      ref.current.value = d
      ref.current.dispatchEvent(ev)
      onChange({ ...ev, target: ref.current })
    }
  }
  return (
    <>
      <RichTextEditor
        {...props}
        onChange={debounce(dispatchChangeEvent, 150)}
        data={value}
        config={{
          extraPlugins: [getCKEUploaderPlugin(`uploads/articles/${articleId}`)],
        }}
      />
      <input type="hidden" name={name} ref={ref} />
    </>
  )
}

export default FormikRichTextEditor
