import { ArticleExample } from './article'
import { HomeExample } from './home'
import { SectionExample } from './section'
import layouts from 'acme-view/src/layouts'

export default {
  article: {
    blocks: ['summary', 'content', 'metadata'],
    editor: layouts.article,
    example: ArticleExample,
    name: 'Simple article',
    preview: layouts.article,
  },
  home: {
    blocks: ['hero', 'one', 'two', 'three', 'four'],
    editor: layouts.home,
    example: HomeExample,
    name: 'Home page',
    preview: layouts.home,
  },
  section: {
    blocks: ['main'],
    editor: layouts.section,
    example: SectionExample,
    name: 'Section overview',
    preview: layouts.section,
  },
}
