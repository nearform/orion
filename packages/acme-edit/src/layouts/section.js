import Example from '../../assets/layout2.inline.svg'
import layouts from 'acme-view/src/layouts'

export default {
  blocks: {
    main: {
      defaultComponent: 'ArticleList',
    },
  },
  editor: layouts.section,
  example: Example,
  name: 'Section overview',
}
