import React from 'react'

import AuthDataContext from './AuthDataContext'

const AuthFormStateContext = React.createContext({ errors: {} })

const authEventMixin = Base =>
  class extends Base {
    static contextType = AuthDataContext
    triggerAuthEvent(event) {
      const { type, data } = event
      const submitting = false
      // Intercept error events and handle separately to other event types.
      if (type === 'error') {
        this.setState({ error: data, submitting })
      } else {
        this.setState({ error: null, submitting })
        super.triggerAuthEvent(event)
      }
    }

    changeState(state, data) {
      this.context.setAuthData(state, data)
      super.changeState(state, data)
    }

    setSubmitting(submitting) {
      this.setState({ submitting })
    }

    /**
     * Read the current authentication state from a component's state.
     * The auth state is composed of the following:
     * - submitting: A flag indicating whether an auth request is being submitted
     *   or not;
     * - errors: An object describing any current errors in the auth process.
     *   The object is a collection of error categories mapped to error messages,
     *   e.g.:
     *      {
     *          "username": "Username is required",
     *          "password": "Password is required"
     *      }
     *   The function uses the component's authErrorCategories property to derive
     *   error category and messages from the error message reported by aws-amplify.
     */
    readAuthState() {
      const { state, authErrorCategories = {} } = this
      if (!state) {
        return { errors: {} }
      }
      // Read auth state.
      const { error, submitting } = state
      if (!error) {
        return { errors: {}, submitting }
      }
      // Generate error categories from the error message.
      const errors = Object.keys(authErrorCategories).reduce(
        (errors, category) => {
          // Test if current category applies to this error message.
          const result = authErrorCategories[category](error)
          if (result) {
            // If result is a string then use as new error message, else use original message.
            errors[category] = typeof result === 'string' ? result : error
          }
          return errors
        },
        {}
      )
      // If no error categories returned then report error in general category.
      if (Object.keys(errors).length === 0) {
        errors.general = error
      }
      return { errors, submitting }
    }

    render() {
      const authState = this.readAuthState()
      return (
        <AuthFormStateContext.Provider value={authState}>
          {super.render()}
        </AuthFormStateContext.Provider>
      )
    }
  }

export default authEventMixin
export { AuthFormStateContext }
