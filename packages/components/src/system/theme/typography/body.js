import { css } from 'styled-components'
import { primaryTypeface } from './font-family'

export const html = css`
  ${primaryTypeface}
  box-sizing: border-box;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  position: relative;
`

export const body = css`
  height: 100%;
  width: 100%;
`
