import { useEffect, useRef } from 'react'

/* Hook 'stolen' from reactjs docs: https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state */

const usePrevious = value => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export default usePrevious
