import Example from '../assets/layout3.inline.svg'
import layouts from 'acme-view/src/layouts'

export default {
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
  name: 'Simple article',
}
