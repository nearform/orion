import ListChildren from 'acme-view/src/components/ListChildren'
import { createPropEditor } from 'gatsby-plugin-orion-edit'

export default {
  editor: ListChildren,
  preview: ListChildren,
  settings: createPropEditor({}),
}
