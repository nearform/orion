import { css } from 'styled-components'

export const fontFamilies = {
  primary: 'Poppins, Helvetica, Arial, sans-serif',
  secondary: 'Didact Gothic, Helvetica, Arial, sans-serif'
}

export const primaryTypeface = css`
  font-family: ${fontFamilies.primary};
`

export const secondaryTypeface = css`
  font-family: ${fontFamilies.secondary};
`
