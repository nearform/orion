import React, { useRef } from 'react'
import { RichTextEditor } from 'components'
import debounce from 'lodash/debounce'
import { getCKEUploaderPlugin } from '../../../utils/image-upload'

const FormikRichTextEditor = ({
  field: { name, value, onChange }, // { name, value, onChange, onBlur }
  articleId,
  ...props
}) => {
  const ref = useRef()
  function dispatchChangeEvent(d) {
    if (ref.current) {
      const ev = new Event('input')
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
        data={value}
        config={{
          extraPlugins: [getCKEUploaderPlugin(`uploads/articles/${articleId}`)],
        }}
        onChange={debounce(dispatchChangeEvent, 150)}
      />
      <input ref={ref} type="hidden" name={name} />
    </>
  )
}

export default FormikRichTextEditor
