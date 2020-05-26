import Example from '../assets/layout1.inline.svg'
import layouts from 'gatsby-plugin-orion-view/src/layouts'

export default {
  allowChildren: false,
  blocks: {
    hero: {
      defaultComponent: 'Hero',
    },
    one: {
      defaultComponent: 'ArticleList',
    },
    two: {
      defaultComponent: 'ArticleList',
    },
    three: {
      defaultComponent: 'ArticleList',
    },
    four: {
      defaultComponent: 'ArticleList',
    },
  },
  editor: layouts.home,
  example: Example,
  name: 'Home page',
}
