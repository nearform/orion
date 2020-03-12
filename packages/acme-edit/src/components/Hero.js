import Hero from 'acme-view/src/components/Hero/Wrap'
import { createPropEditor } from 'gatsby-plugin-orion-edit'

export default {
  editor: Hero,
  preview: Hero,
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
