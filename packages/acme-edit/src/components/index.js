import components from 'acme-view/src/components'
import { createPropEditor } from 'gatsby-plugin-orion-edit'

export default {
  ArticleContent: {
    editor: createPropEditor({
      content: {
        required: true,
        type: 'string',
      },
      image: {
        required: false,
        type: 'string',
      },
    }),
    preview: components.ArticleContent,
  },
  ArticleMetadata: {
    editor: createPropEditor({
      readTime: {
        required: true,
        type: 'number',
      },
    }),
    preview: components.ArticleMetadata,
  },
  ListChildren: {
    editor: createPropEditor({}),
    preview: components.ListChildren,
  },
}
