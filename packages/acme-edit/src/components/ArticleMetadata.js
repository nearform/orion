import ArticleMetadata from 'acme-view/src/components/ArticleMetadata/Wrap'
import { createPropEditor } from 'gatsby-plugin-orion-edit'

export default {
  editor: ArticleMetadata,
  preview: ArticleMetadata,
  settings: createPropEditor({
    readTime: {
      label: 'Read time',
      required: true,
      type: 'number',
    },
  }),
}
