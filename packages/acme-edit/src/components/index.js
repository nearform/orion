import components from 'acme-view/src/components'
import { createPropEditor } from 'gatsby-plugin-orion-edit'

export default {
  ArticleContent: {
    editor: createPropEditor({
      image: {
        label: 'Image',
        required: false,
        type: 'text',
      },
      content: {
        label: 'Content',
        required: true,
        type: 'markdown',
      },
    }),
    preview: components.ArticleContent,
  },
  ArticleList: {
    editor: createPropEditor({
      title: {
        label: 'Title',
        required: false,
        type: 'string',
      },
      type: {
        label: 'Type',
        options: ['highlights', 'grid', 'rows'],
        required: true,
        type: 'select',
      },
      clipImage: {
        label: 'Clip image?',
        required: true,
        type: 'boolean',
      },
      suppressImage: {
        label: 'Suppress image?',
        required: true,
        type: 'boolean',
      },
      suppressSummary: {
        label: 'Suppress summary?',
        required: true,
        type: 'boolean',
      },
      withFeatured: {
        label: 'With featured?',
        required: true,
        type: 'boolean',
      },
    }),
    preview: components.ArticleList,
  },
  ArticleMetadata: {
    editor: createPropEditor({
      readTime: {
        label: 'Read time',
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
