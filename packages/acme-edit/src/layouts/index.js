import layouts from 'acme-view/src/layouts'

export default {
  article: {
    blocks: ['content', 'metadata'],
    preview: layouts.article,
  },
  home: {
    blocks: ['main'],
    preview: layouts.home,
  },
  section: {
    blocks: ['main'],
    preview: layouts.section,
  },
}
