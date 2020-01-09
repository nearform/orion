import React, { useRef } from 'react'
import { Formik } from 'formik'
import { useDebouncedCallback } from 'use-debounce'
import isEqual from 'lodash/isEqual'

// Wraps the Formik component to allow for sane auto-saving AND watch functionality.
// To avoid race conditions and stale data being loaded into the form (due to delayed),
// a series of timestamps ensure that the initialValues reset the form if they are
// not stale and the form is not currently saving.
const AutoSaveWatchFormik = props => {
  const {
    // The initialValues of the form (could also be updated externally due to a watch)
    initialValues,
    // The values must have an associated (unix epoch ms) timestamp so we can ignore "stale" updates
    initialValuesTimestamp,
    debounceIntervalMs = 1000,
    children,
    ...formikProps
  } = props

  // Wrap the children with the autosave + watch functionality
  function childrenWrapper(formikContext) {
    const { values, submitForm, resetForm } = formikContext

    // Create some refs to hold the timestamps
    const lastEditTimestamp = useRef()
    const lastSaveDoneTimestamp = useRef()

    // Create a callback that will submit the form after debouncing
    const [debouncedSubmit, , pendingSubmit] = useDebouncedCallback(
      async () => {
        try {
          await submitForm()
        } finally {
          // Note the last time the form was submitted
          lastSaveDoneTimestamp.current = Date.now()
        }
      },
      debounceIntervalMs
    )

    // When the component unmounts, force the pending submit
    // NOTE: this is not working with useGraphQL because it does not make the request if we are unmounting
    // See: https://github.com/nearform/graphql-hooks/blob/b562a414d019cda4c7acd98554e99004bc52c582/packages/graphql-hooks/src/useClientRequest.js#L123
    React.useEffect(() => () => pendingSubmit(), [])

    // When the values of the form change:
    // - store the values to detect future changes
    // - store the last edit timestamp
    // - trigger a debounced submit
    const prevValuesRef = React.useRef(values)
    if (!isEqual(prevValuesRef.current, values)) {
      lastEditTimestamp.current = Date.now()
      prevValuesRef.current = values
      debouncedSubmit()
    }

    // Determine if any edits were made AFTER the last mutation
    const saving =
      lastEditTimestamp.current > lastSaveDoneTimestamp.current ||
      // > operator will always return false if one of the values is undefined
      (lastEditTimestamp.current !== undefined &&
        lastSaveDoneTimestamp.current === undefined)

    // Determine if the incoming data is older than the last save
    const stale = lastSaveDoneTimestamp.current > initialValuesTimestamp

    // Detect external changes to the initialValues and reset the form
    if (!saving && !stale && !isEqual(values, initialValues)) {
      resetForm({ values: initialValues })
      // Prevent the form from submitting on the next render
      prevValuesRef.current = initialValues
    }

    return children({ ...formikContext, saving })
  }

  return (
    // The form is now reset explicitly: disable Formik's enableReinitialize functionality
    <Formik
      {...formikProps}
      enableReinitialize={false}
      initialValues={initialValues}
    >
      {childrenWrapper}
    </Formik>
  )
}

export default AutoSaveWatchFormik
