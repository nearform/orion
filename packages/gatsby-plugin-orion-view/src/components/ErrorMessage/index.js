import React from 'react'
import PropTypes from 'prop-types'
import PaddedContainer from 'gatsby-plugin-orion-core/src/components/PaddedContainer'

const ErrorMessage = ({ title, errorCode, message }) => (
  <PaddedContainer>
    <div>
      <h1>{title}</h1>
      <p>
        That&apos;s a {errorCode}. {message}.
      </p>
    </div>
  </PaddedContainer>
)

ErrorMessage.propTypes = {
  title: PropTypes.string.isRequired,
  errorCode: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
}

export default ErrorMessage
