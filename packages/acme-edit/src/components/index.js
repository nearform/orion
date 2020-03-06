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
  ArticleList: {
    editor: createPropEditor({
      title: {
        required: false,
        type: 'string',
      },
      type: {
        required: true,
        type: 'string',
      },
      clipImage: {
        required: true,
        type: 'boolean',
      },
      suppressImage: {
        required: true,
        type: 'boolean',
      },
      suppressSummary: {
        required: true,
        type: 'boolean',
      },
      withFeatured: {
        required: true,
        type: 'boolean',
      },
    }),
    preview: components.ArticleList,
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
  Hero: {
    editor: createPropEditor({}),
    preview: components.Hero,
  },
  ListChildren: {
    editor: createPropEditor({}),
    preview: components.ListChildren,
  },
}
