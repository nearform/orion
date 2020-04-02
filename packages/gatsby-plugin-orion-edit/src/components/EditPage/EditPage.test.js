/* eslint-disable camelcase */
import produce from 'immer' // eslint-disable-line import/no-named-as-default

import { reducer } from '.'

jest.mock('../../queries/create-page.graphql', () => 'mutation')

jest.mock('../../queries/update-page.graphql', () => 'mutation')
jest.mock('../../queries/get-pages.graphql', () => 'query')
jest.mock('../../queries/update-ancestry.graphql', () => 'query')
jest.mock('../../queries/update-position.graphql', () => 'query')

const initialState = {
  ancestry: [
    {
      ancestor: { id: 2, path: '/latest-news', title: 'Latest news' },
      direct: true,
    },
  ],
  authors: [
    {
      user: {
        avatar: 'https://avatars2.githubusercontent.com/u/35329295?s=460&v=4',
        given_name: 'Jack Murdoch',
        id: 1,
        title: 'Developer',
      },
    },
  ],
  contents: [
    {
      block: 'metadata',
      component: 'ArticleMetadata',
      id: 38,
      props: { readTime: 5 },
    },
    {
      block: 'content',
      component: 'ArticleContent',
      id: 39,
      props: {
        image:
          'https://s3-eu-west-1.amazonaws.com/orion-assets.nearform.com/public/default/place-5%402x.png',
        content:
          'When a company insures an individual entity, there are basic legal requirements and regulations. Several commonly cited legal principles of insurance include:\n\n1. Indemnity – the insurance company indemnifies, or compensates, the insured in the case of certain losses only up to the insured\'s interest.\n2. Benefit insurance – as it is stated in the study books of The Chartered Insurance Institute, the insurance company does not have the right of recovery from the party who caused the injury and is to compensate the Insured regardless of the fact that Insured had already sued the negligent party for the damages (for example, personal accident insurance)\n3. Insurable interest – the insured typically must directly suffer from the loss. Insurable interest must exist whether property insurance or insurance on a person is involved. The concept requires that the insured have a "stake" in the loss or damage to the life or property insured. What that "stake" is will be determined by the kind of insurance involved and the nature of the property ownership or relationship between the persons. The requirement of an insurable interest is what distinguishes insurance from gambling.\n4. Utmost good faith – (Uberrima fides) the insured and the insurer are bound by a good faith bond of honesty and fairness. Material facts must be disclosed.\n5. Contribution – insurers which have similar obligations to the insured contribute in the indemnification, according to some method.\n6. Subrogation – the insurance company acquires legal rights to pursue recoveries on behalf of the insured; for example, the insurer may sue those liable for the insured\'s loss. The Insurers can waive their subrogation rights by using the special clauses.\n7. Causa proxima, or proximate cause – the cause of loss (the peril) must be covered under the insuring agreement of the policy, and the dominant cause must not be excluded\n8. Mitigation – In case of any loss or casualty, the asset owner must attempt to keep loss to a minimum, as if the asset was not insured.\n',
      },
    },
    {
      block: 'summary',
      component: 'ArticleContent',
      id: 40,
      props: {
        content:
          'When a company insures an individual entity, there are basic legal requirements and regulations.',
      },
    },
  ],
  descendants: [],
  tags: [{ tag: { hidden: false, tag: '2020' } }],
  created: '2020-03-09T13:04:33.627494+00:00',
  id: 23,
  layout: 'article',
  modified: null,
  path: '/latest-news/legal',
  published: '2020-03-09T13:04:33.588+00:00',
  show_in_menu: false,
  title: 'Legal requirements',
  allTags: [
    { tag: '2020', hidden: false },
    { tag: 'history', hidden: false },
  ],
}

describe('Edit page reducer', () => {
  it('handles updates to the settings', () => {
    const payload = produce(initialState, draft => {
      draft.title = 'something different'
      draft.show_in_menu = true
      draft.path = '/else/where'
      draft.layout = 'section'
    })
    const state = reducer(initialState, { type: 'settings', ...payload })
    expect(state).toEqual(payload)
  })

  it('handles updates to layout', () => {
    const payload = {
      layout: 'alternate',
      contents: [
        {
          block: 'metadata',
          component: 'ArticleMetadata',
          id: 38,
          props: { readTime: 7 },
        },
        {
          block: 'content',
          component: 'ArticleContent',
          id: 39,
          props: {
            image: 'different.png',
            content: 'nonesense content for test',
          },
        },
        {
          block: 'summary',
          component: 'ArticleContent',
          id: 40,
          props: {
            content: 'Test.',
          },
        },
      ],
    }
    const state = reducer(initialState, { type: 'layout', ...payload })
    expect(state.layout).toEqual(payload.layout)
    expect(state.contents).toEqual(payload.contents)
  })

  it('handles updates to component by only updating the relevent block of content', () => {
    const payload = {
      page: {},
      block: 'summary',
      component: 'TestArticleContent',
      props: {
        content: 'test.',
      },
    }
    const state = reducer(initialState, { type: 'component', ...payload })
    expect(state.contents.find(t => t.block === 'summary')).toEqual({
      block: payload.block,
      component: payload.component,
      props: payload.props,
    })
  })

  it('handles updates to the page tags by overwriting them', () => {
    const cases = [
      [],
      [
        { tag: { tag: 'test', hidden: false } },
        { tag: { tag: 'test2', hidden: false } },
      ],
    ]
    cases.forEach(testTags => {
      const payload = {
        tags: testTags,
      }
      const state = reducer(initialState, { type: 'saveTags', ...payload })
      expect(state.tags).toEqual(payload.tags)
    })
  })
})
