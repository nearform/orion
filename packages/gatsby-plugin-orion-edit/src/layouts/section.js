import Example from '../assets/layout2.inline.svg'
import layouts from 'gatsby-plugin-orion-view/src/layouts'

export default {
  allowChildren: true,
  blocks: {
    main: {
      defaultComponent: 'ArticleList',
    },
  },
  editor: layouts.section,
  example: Example,
  name: 'Section overview',
}
