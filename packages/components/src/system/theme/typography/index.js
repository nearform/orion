import { createGlobalStyle } from 'styled-components'
import { h1, h2, h3, h4, h5, h6 } from './headings'
import { html, body } from './body'
import { button } from './elements'

const Typography = createGlobalStyle`
  h1 {
    ${h1}
  }
  h2 {
    ${h2}
  }
  h3 {
    ${h3}
  }
  h4 {
    ${h4}
  }
  h5 {
    ${h5}
  }
  h6 {
    ${h6}
  }
  html {
    ${html}
  }
  body {
    ${body}
  }
  button {
    ${button}
  }
`

export { fontFamilies } from './font-family'

export default Typography
