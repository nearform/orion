import React, { Fragment } from 'react'
import typography, { fontFamilies } from './typography'
import { OrangePalette, KnowledgebasePalette } from './colors'
import { ThemeProvider } from 'styled-components'
import { createTheme } from 'saluki'
import defaultTheme from 'saluki-theme-default'
import layout from './grid'

export const Orange = { ...fontFamilies, ...OrangePalette, ...layout }
export const Knowledgebase = {
  ...fontFamilies,
  ...KnowledgebasePalette,
  ...layout,
}

// this seems to be related to this issue that makes the linter think
// this is a component: https://github.com/yannickcr/eslint-plugin-react/issues/1919
/* eslint-disable react/prop-types, react/display-name */
const getThemeContext = (themeConfig, themeTypography) => ({ children }) => (
  <Fragment>
    {React.createElement(themeTypography)}
    <ThemeProvider theme={createTheme(defaultTheme, themeConfig)}>
      {children}
    </ThemeProvider>
  </Fragment>
)
/* eslint-enable react/prop-types, react/display-name */

export const OrangeTheme = getThemeContext(Orange, typography)
export const KnowledgebaseTheme = getThemeContext(Knowledgebase, typography)
