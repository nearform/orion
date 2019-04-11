import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import {
  fontSize,
  backgroundColor,
  color,
  fontWeight,
  letterSpacing,
  textTransform,
  paddingVertical,
  paddingHorizontal,
  borderRadius,
  borderStyle,
  boxShadow,
} from 'saluki'

const secondary = css`
  ${color('primaryDark')}
  ${backgroundColor('textContrast')}
`
const primary = css`
  ${color('textContrast')}
  ${backgroundColor('primaryMain')}
`

const Button = styled.button`
  ${fontSize('xSmall')}
  ${fontWeight('bold')}
  ${letterSpacing('large')}
  ${textTransform('uppercase')}
  ${paddingVertical('xSmall')}
  ${paddingHorizontal('small')}
  ${borderRadius('medium')}
  ${boxShadow('element')}
  ${borderStyle('none')}
  ${({ inverted }) => (inverted ? secondary : primary)}
`

Button.propTypes = {
  inverted: PropTypes.bool,
}

export default Button
