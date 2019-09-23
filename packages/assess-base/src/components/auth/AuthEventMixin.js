import React from 'react'

const ErrorContext = React.createContext(null)

// Rules for assigning a category to an error based on the error message.
const ErrorCategories = {
  username: error => /user/i.test(error),
  password: error => /password/i.test(error),
}

/**
 * Read an error from a component's state.
 * Tries to assign an error category based on the error message and
 * the rules defined in the ErrorCategories array.
 * Returns null if no error found.
 */
function readError({ state }) {
  if (!state) {
    return null
  }
  const { error } = state
  if (!error) {
    return null
  }
  // Attempt to assign a category; default to 'general' if no match found.
  const category =
    Object.keys(ErrorCategories).find(category =>
      ErrorCategories[category](error)
    ) || 'general'
  return { category, message: error }
}

const authEventMixin = Base =>
  class extends Base {
    triggerAuthEvent(event) {
      const { type, data } = event
      // Intercept error events and handle separately to other event types.
      if (type === 'error') {
        this.setState({ error: data })
      } else {
        this.setState({ error: null })
        super.triggerAuthEvent(event)
      }
    }

    render() {
      const error = readError(this)
      return (
        <ErrorContext.Provider value={error}>
          {super.render()}
        </ErrorContext.Provider>
      )
    }
  }

export default authEventMixin
export { ErrorContext }
