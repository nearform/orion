import components from 'acme-view/src/components'
import { createPropEditor } from 'gatsby-plugin-orion-edit'

export default {
  editor: components.ArticleMetadata,
  settings: createPropEditor({
    readTime: {
      label: 'Read time',
      required: true,
      type: 'number',
    },
  }),
}
