import styled from 'styled-components'
import {
  fontSize,
  color,
  boxShadow,
  borderStyle,
  height,
  paddingHorizontal,
  minWidth
} from 'saluki'

const Input = styled.input`
  ${fontSize('xSmall')}
  ${color('textPrimary')}
  ${boxShadow('element')}
  ${borderStyle('none')}
  ${height('small')}
  ${paddingHorizontal('xSmall')}
  ${minWidth('input')}
  ::placeholder {
    ${color('textHint')}
    transition: opacity 500ms;
  }

`

export default Input
