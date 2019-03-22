import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ onChange }) => <input onChange={onChange} />

Input.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default Input
