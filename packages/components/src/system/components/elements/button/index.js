import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { fontFamily, fontSize, color, padding } from 'saluki'

const StyledButton = styled.button`
  ${fontFamily}
  ${padding}
  ${fontSize}
  ${color}
`
const Button = ({ label, onClick }) => (
  <StyledButton onClick={onClick}>{label}</StyledButton>
)

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Button
