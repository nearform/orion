import Example from '../assets/layout3.inline.svg'
import layouts from 'acme-view/src/layouts'

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
  editor: layouts.page,
  example: Example,
  name: 'Simple page',
}
