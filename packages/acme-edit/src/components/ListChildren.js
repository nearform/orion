import components from 'acme-view/src/components'
import { createPropEditor } from 'gatsby-plugin-orion-edit'

export default {
  editor: components.ListChildren,
  settings: createPropEditor({}),
}
