import { css } from 'styled-components'
import { primaryTypeface } from './font-family'

export const h1 = css`
  ${primaryTypeface}
  font-weight: 300;
  font-size: 6rem;
  line-height: 1;
  letter-spacing: -0.01562em;
`

export const h2 = css`
  ${primaryTypeface}
  font-weight: 300;
  font-size: 3.75rem;
  line-height: 1;
  letter-spacing: -0.01562em;
`

export const h3 = css`
  ${primaryTypeface}
  font-weight: 400;
  font-size: 3rem;
  line-height: 1.04;
  letter-spacing: 0em;
`

export const h4 = css`
  ${primaryTypeface}
  font-weight: 400;
  font-size: 2.125rem;
  line-height: 1.17;
  letter-spacing: 0.00735em;
`

export const h5 = css`
  ${primaryTypeface}
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.33;
  letter-spacing: 0em;
`

export const h6 = css`
  ${primaryTypeface}
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.6;
  letter-spacing: 0.0075em;
`
