import Example from '../assets/layout3.inline.svg'
import layouts from 'gatsby-plugin-orion-view/src/layouts'

export default {
  allowChildren: false,
  blocks: {
    metadata: {
      defaultComponent: 'ArticleMetadata',
    },
    content: {
      defaultComponent: 'ArticleContent',
    },
  },
  editor: layouts.article,
  example: Example,
  name: 'Article',
}
