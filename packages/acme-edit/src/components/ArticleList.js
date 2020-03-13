import ArticleList from 'acme-view/src/components/ArticleList'
import { createPropEditor } from 'gatsby-plugin-orion-edit'

export default {
  editor: ArticleList,
  preview: ArticleList,
  settings: createPropEditor({
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
}
