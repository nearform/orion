import components from 'acme-view/src/components'
import { createPropEditor } from 'gatsby-plugin-orion-edit'

export default {
  editor: components.Hero,
  settings: createPropEditor({
    image: {
      label: 'Image',
      required: true,
      type: 'string',
    },
    title: {
      label: 'Title',
      required: true,
      type: 'string',
    },
    subtitle: {
      label: 'Subtitle',
      required: true,
      type: 'string',
    },
  }),
}
