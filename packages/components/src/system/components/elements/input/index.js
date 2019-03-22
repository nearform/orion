import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fontSize } from 'saluki'

const StyledInput = styled.input`
  ${fontSize('large')}
`

const Input = ({ onChange }) => <StyledInput onChange={onChange} />

Input.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default Input
