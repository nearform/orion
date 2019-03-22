import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fontSize, color } from 'saluki'

const StyledButton = styled.button`
  ${fontSize('large')}
  ${color('blue')}
`
const Button = ({ label, onClick }) => (
  <StyledButton onClick={onClick}>{label}</StyledButton>
)

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Button
