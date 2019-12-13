import React from 'react'
import { useFormikContext } from 'formik'
import { useDebouncedCallback } from 'use-debounce'

// Adapted from:
// - https://jaredpalmer.com/formik/docs/api/useFormikContext
// - https://github.com/jaredpalmer/formik/blob/e51f09a318cba216a1ba3932da0906202df0b979/examples/DebouncedAutoSave.js
//
// This must be a child (surronded by) a Formik <Form> component.
const AutoSaveFormik = ({ debounceIntervalMs = 1000 }) => {
  // Get the Formik context from the nearest ancestor
  const { values, submitForm, dirty } = useFormikContext()

  // Create a callback that will submit the form after debouncing
  const [debouncedSubmit, , pendingSubmit] = useDebouncedCallback(
    () => submitForm(),
    debounceIntervalMs
  )

  // When the component unmounts, force the pending submit
  // NOTE: this is not working because it seems that useGraphQL hook does not make the request if we are unmounting
  // See: https://github.com/nearform/graphql-hooks/blob/b562a414d019cda4c7acd98554e99004bc52c582/packages/graphql-hooks/src/useClientRequest.js#L123
  React.useEffect(() => () => pendingSubmit(), [])

  React.useEffect(
    // Call the debouncedSubmit on any changes to the form values
    () => {
      // Avoid submitting when the form is initially loaded (the values will have changed, but we don't need to submit)
      if (!dirty) {
        return
      }

      debouncedSubmit()
    },
    // Dan Abramov said JSON.stringify is a viable solution for form data: no circular references), no weird dates strings, etc.
    // See https://github.com/facebook/react/issues/14476#issuecomment-471199055
    [JSON.stringify(values), submitForm, debouncedSubmit]
  )

  return null
}

export default AutoSaveFormik
