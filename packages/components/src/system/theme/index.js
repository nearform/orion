import { fontFamilies } from './typography'
import { OrangePalette, KnowledgebasePalette } from './colors'
import layout from './grid'

export const OrangeTheme = { ...fontFamilies, ...OrangePalette, ...layout }
export const KnowledgebaseTheme = {
  ...fontFamilies,
  ...KnowledgebasePalette,
  ...layout
}
