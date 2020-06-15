/* eslint-disable max-nested-callbacks */
/* eslint-disable camelcase */
import React from 'react'
import produce from 'immer' // eslint-disable-line import/no-named-as-default
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import theme from 'gatsby-theme-acme'
import { render, fireEvent, waitFor } from '@testing-library/react'
import EditPage, { reducer } from '.'
import { useMutation, useQuery } from 'graphql-hooks'
import { useLocation } from '@reach/router'
import * as mui from '@material-ui/pickers'
import * as slugifyWrap from 'gatsby-plugin-orion-core/src/utils/slugify'
import { useEditComponents } from '../EditComponentProvider'

jest.spyOn(mui, 'DateTimePicker')
jest.spyOn(slugifyWrap, 'default')

const mockDate = new Date('2020-03-09T13:05:20.588+00:00')

const otherMockDate = new Date('2021-01-01')

const _Date = Date
global.Date = jest.fn(() => mockDate)
global.Date.UTC = _Date.UTC
global.Date.parse = _Date.parse
global.Date.now = _Date.now

jest.mock('@reach/router')
useLocation.mockReturnValue({
  pathname: '/',
})
jest.mock('../../queries/get-pages.graphql', () => 'mockGetPagesQuery')
jest.mock(
  '../../queries/update-ancestry.graphql',
  () => 'mockUpdateAncestryMutation'
)
jest.mock(
  '../../queries/update-position.graphql',
  () => 'mockUpdatePositionMutation'
)

jest.mock(
  '../../queries/update-page-title.graphql',
  () => 'updatePageTitleMutation'
)
jest.mock(
  '../../queries/update-page-show_in_menu.graphql',
  () => 'updatePageShowInMenuMutation'
)

jest.mock('../../queries/create-page.graphql', () => 'mockCreatePageMutation')
jest.mock('../../queries/update-page.graphql', () => 'mockUpdatePageMutation')
jest.mock('graphql-hooks')
useQuery.mockReturnValue({
  data: null,
})
jest.mock('../EditComponentProvider')
useEditComponents.mockReturnValue({
  layouts: {
    article: {
      allowChildren: false,
      blocks: {
        metadata: {
          defaultComponent: 'ArticleMetadata',
        },
        content: {
          defaultComponent: 'ArticleContent',
        },
      },
      editor: () => <div>layouts.article</div>,
      example: () => <div>Example</div>,
      name: 'Article',
    },
    page: {
      allowChildren: false,
      blocks: {
        metadata: {
          defaultComponent: 'ArticleMetadata',
        },
        content: {
          defaultComponent: 'ArticleContent',
        },
      },
      editor: () => <div>layouts.page</div>,
      example: () => <div>Example</div>,
      name: 'Simple page',
    },
  },
  wrapper: ({ children }) => <div>{children}</div>,
})

const mockCreatePage = jest.fn()
const mockUpdatePage = jest.fn(() => ({
  data: {
    update_orion_page: {
      returning: [{ id: 1999 }],
    },
  },
}))
useMutation.mockImplementation(mutation => {
  if (mutation === 'mockCreatePageMutation') {
    return [mockCreatePage]
  }

  if (mutation === 'mockUpdatePageMutation') {
    return [mockUpdatePage]
  }

  return []
})
const mockInitialState = {
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
          'When a company insures an individual entity, there are basic legal requirements and regulations.',
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
  tags: [{ tag: { hidden: false, tag: 'test-tag' } }],
  created: '2020-03-09T13:04:33.627494+00:00',
  id: 23,
  layout: 'page',
  modified: null,
  path: '/latest-news/legal',
  show_in_menu: false,
  title: 'Legal requirements',
  allTags: [
    { tag: 'test-tag', hidden: false },
    { tag: 'history', hidden: false },
  ],
}
const makeInitialState = values => ({
  ...mockInitialState,
  ...values,
})

const mockOnSave = jest.fn()
const renderPage = values =>
  render(
    <ThemeProvider theme={createMuiTheme(theme)}>
      <EditPage initialState={makeInitialState(values)} onSave={mockOnSave} />
    </ThemeProvider>
  )

describe('Edit page reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('handles updates to the settings', () => {
    const payload = produce(mockInitialState, draft => {
      draft.title = 'something different'
      draft.show_in_menu = true
      draft.path = '/else/where'
      draft.layout = 'page'
    })
    const state = reducer(mockInitialState, { type: 'settings', ...payload })
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
    const state = reducer(mockInitialState, { type: 'layout', ...payload })
    expect(state.layout).toEqual(payload.layout)
    expect(state.contents).toEqual(payload.contents)
  })

  describe('When updating the content and there is a new title', () => {
    let state
    const newTitle = 'A new title & stuff'
    beforeEach(() => {
      const payload = {
        page: {
          title: newTitle,
        },
        block: 'summary',
        component: 'TestArticleContent',
        props: {
          content: 'test.',
        },
      }
      state = reducer(mockInitialState, { type: 'component', ...payload })
    })
    it('updates the title of the page', () => {
      expect(state.title).toEqual(newTitle)
    })
    it('updates the path of the page', () => {
      expect(state.path).toEqual('a-new-title-and-stuff')
    })
    it('runs the new title through the slugify function to strip special characters', () => {
      expect(slugifyWrap.default).toHaveBeenCalledWith(newTitle)
    })
  })
  describe('When updating the content and there is NOT a new title', () => {
    it('handles updates to component by only updating the relevent block of content', () => {
      const payload = {
        page: {},
        block: 'summary',
        component: 'TestArticleContent',
        props: {
          content: 'test.',
        },
      }
      const state = reducer(mockInitialState, { type: 'component', ...payload })
      expect(state.contents.find(t => t.block === 'summary')).toEqual({
        block: payload.block,
        component: payload.component,
        props: payload.props,
      })
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
      const state = reducer(mockInitialState, { type: 'saveTags', ...payload })
      expect(state.tags).toEqual(payload.tags)
    })
  })

  it('handles changes to the publish date', () => {
    const payload = { date: otherMockDate }
    const state = reducer(mockInitialState, {
      type: 'setPublishedDate',
      ...payload,
    })
    expect(state.published).toEqual(otherMockDate)
  })

  it('handles changes to the expires date', () => {
    const payload = { date: otherMockDate }
    const state = reducer(mockInitialState, {
      type: 'setExpiresdDate',
      ...payload,
    })
    expect(state.expires).toEqual(otherMockDate)
  })

  describe('When updating the path with NO ancestors', () => {
    const oldState = produce(mockInitialState, draft => {
      draft.ancestry = []
    })
    it('handles changes to the path', () => {
      const action = { type: 'setPath', path: 'a-new-path' }
      const state = reducer(oldState, action)
      expect(state.path).toEqual('/a-new-path')
    })

    it('handles a blank path as the root', () => {
      const action = { type: 'setPath', path: '' }
      const state = reducer(oldState, action)
      expect(state.path).toEqual('/')
    })
  })
  describe('When updating the path and it has one ancestor', () => {
    it('handles changes to the path', () => {
      const action = { type: 'setPath', path: 'a-new-path' }
      const state = reducer(mockInitialState, action)
      expect(state.path).toEqual('/latest-news/a-new-path')
    })
    it('handles a blank path as the root', () => {
      const action = { type: 'setPath', path: '' }
      const state = reducer(mockInitialState, action)
      expect(state.path).toEqual('/latest-news/')
    })
  })

  describe('When updating the path and it has two ancestors', () => {
    const oldState = produce(mockInitialState, draft => {
      draft.ancestry = [
        {
          ancestor: {
            id: 2,
            path: '/latest-news',
            title: 'Latest news',
          },
          direct: false,
        },
        {
          ancestor: {
            id: 3,
            path: '/latest-news/other-news',
            title: 'Other news',
          },
          direct: true,
        },
      ]
    })
    it('handles changes to the path', () => {
      const action = { type: 'setPath', path: 'a-new-path' }
      const state = reducer(oldState, action)
      expect(state.path).toEqual('/latest-news/other-news/a-new-path')
    })

    it('handles a blank path as the root', () => {
      const action = { type: 'setPath', path: '' }
      const state = reducer(oldState, action)
      expect(state.path).toEqual('/latest-news/other-news/')
    })
  })
})

describe('EditPage component', () => {
  describe('When I am viewing the template selection screen', () => {
    let templatePage
    const blankPage = {
      allTags: [{ tag: 'jonny5', hidden: false }],
      ancestry: [],
      authors: [{ user: { id: 0 } }],
      contents: [],
      descendants: [],
      path: '',
      show_in_menu: true,
      tags: [],
      title: 'New page',
      layout: '',
    }
    beforeEach(() => {
      templatePage = renderPage(blankPage)
    })
    it('does not show the top menu as there is nothing to set yes', () => {
      const { queryByText } = templatePage

      expect(queryByText('Path:')).not.toBeInTheDocument()
    })
  })

  describe('Publishing', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should have a publish button', () => {
      const { getByText } = renderPage()
      expect(getByText('Publish')).toBeInTheDocument()
    })
    it('should have a date picker', () => {
      renderPage()
      expect(mui.DateTimePicker).toHaveBeenCalledWith(
        expect.objectContaining({
          autoOk: true,
          showTodayButton: true,
          id: 'published-date-picker',
          ampm: false,
          emptyLabel: 'Now',
          format: 'MMM dd yyyy, hh:mm a',

          onChange: expect.any(Function),
          orientation: 'portrait',
          value: null,
          variant: 'dialog',
        }),
        {}
      )
    })

    describe('When I am editing an unpublished page', () => {
      let unpublishedPage
      beforeEach(() => {
        unpublishedPage = renderPage()
      })
      it('the date picker should show the text "now"', () => {
        const { getByDisplayValue } = unpublishedPage
        expect(getByDisplayValue('Now')).toBeInTheDocument()
      })
      describe('And I click on the publish button', () => {
        it('should save the page with all data and a publish date of now', () => {
          const { getByText } = unpublishedPage
          fireEvent.click(getByText('Publish'))
          expect(mockUpdatePage.mock.calls[0][0].variables.published).toEqual(
            mockDate
          )
          expect(mockUpdatePage).toHaveBeenCalledWith({
            variables: {
              contents: [
                {
                  block: 'metadata',
                  component: 'ArticleMetadata',
                  id: 38,
                  page_id: 23,
                  props: { readTime: 5 },
                },
                {
                  block: 'content',
                  component: 'ArticleContent',
                  id: 39,
                  page_id: 23,
                  props: {
                    content:
                      'When a company insures an individual entity, there are basic legal requirements and regulations.',
                    image:
                      'https://s3-eu-west-1.amazonaws.com/orion-assets.nearform.com/public/default/place-5%402x.png',
                  },
                },
                {
                  block: 'summary',
                  component: 'ArticleContent',
                  id: 40,
                  page_id: 23,
                  props: {
                    content:
                      'When a company insures an individual entity, there are basic legal requirements and regulations.',
                  },
                },
              ],
              id: 23,
              layout: 'page',
              modified: mockDate,
              path: '/latest-news/legal',
              published: mockDate,
              showInMenu: false,
              pageTags: [{ page_id: 23, tag_id: 'test-tag' }],
              title: 'Legal requirements',
              expires: null,
            },
          })
        })
      })
      describe('And I select a publish date from the date picker and click the publish button', () => {
        beforeEach(async () => {
          const { getByText } = unpublishedPage
          const [renderPublishDatePicker] = mui.DateTimePicker.mock.calls
          await waitFor(() => {
            return renderPublishDatePicker[0].onChange(otherMockDate)
          })
          const reRenderPublishDatePicker = mui.DateTimePicker.mock.calls[2]
          expect(reRenderPublishDatePicker[0].value).toEqual(otherMockDate)
          fireEvent.click(getByText('Publish'))
        })

        it('should save the page with all data and a publish date selected', async () => {
          expect(mockUpdatePage.mock.calls[0][0].variables.published).toEqual(
            otherMockDate
          )
        })
      })
    })

    describe('When I am editing a page that is already published', () => {
      let editPage

      beforeEach(() => {
        editPage = renderPage({ published: mockDate })
      })

      it('the date picker should show the date the page was published on', () => {
        expect(mui.DateTimePicker.mock.calls[0][0].value).toEqual(mockDate)
      })

      describe('And I click on the publish button', () => {
        beforeEach(() => {
          const { getByText } = editPage
          fireEvent.click(getByText('Publish'))
        })

        it('should save the page with all data and the previously selected date', () => {
          expect(mockUpdatePage.mock.calls[0][0].variables.published).toEqual(
            mockDate
          )
          expect(mockUpdatePage).toHaveBeenCalledWith({
            variables: {
              contents: [
                {
                  block: 'metadata',
                  component: 'ArticleMetadata',
                  id: 38,
                  page_id: 23,
                  props: { readTime: 5 },
                },
                {
                  block: 'content',
                  component: 'ArticleContent',
                  id: 39,
                  page_id: 23,
                  props: {
                    content:
                      'When a company insures an individual entity, there are basic legal requirements and regulations.',
                    image:
                      'https://s3-eu-west-1.amazonaws.com/orion-assets.nearform.com/public/default/place-5%402x.png',
                  },
                },
                {
                  block: 'summary',
                  component: 'ArticleContent',
                  id: 40,
                  page_id: 23,
                  props: {
                    content:
                      'When a company insures an individual entity, there are basic legal requirements and regulations.',
                  },
                },
              ],
              id: 23,
              layout: 'page',
              modified: mockDate,
              path: '/latest-news/legal',
              published: mockDate,
              showInMenu: false,
              pageTags: [{ page_id: 23, tag_id: 'test-tag' }],
              title: 'Legal requirements',
              expires: null,
            },
          })
        })
      })
      describe('And I select a publish date from the date picker and click the publish button', () => {
        beforeEach(async () => {
          const { getByText } = editPage
          const [renderPublishDatePicker] = mui.DateTimePicker.mock.calls

          await waitFor(() => {
            return renderPublishDatePicker[0].onChange(otherMockDate)
          })
          const reRenderPublishDatePicker = mui.DateTimePicker.mock.calls[2]
          expect(reRenderPublishDatePicker[0].value).toEqual(otherMockDate)
          fireEvent.click(getByText('Publish'))
        })
        it('should save the page with the correct publish date', () => {
          expect(mockUpdatePage.mock.calls[0][0].variables.published).toEqual(
            otherMockDate
          )
        })
        it('Then I can NOT select an expires date less than the publish date', () => {
          const reRenderExpiresDatePicker = mui.DateTimePicker.mock.calls[3]
          expect(reRenderExpiresDatePicker[0].minDate).toEqual(otherMockDate)
        })
      })

      describe('And I do NOT set an expires date and then I publish', () => {
        beforeEach(async () => {
          const { getByText } = editPage

          fireEvent.click(getByText('Publish'))
        })

        it('save the expires date as null', () => {
          expect(mockUpdatePage.mock.calls[0][0].variables.expires).toEqual(
            null
          )
        })
      })

      describe('And I set an expires date', () => {
        beforeEach(async () => {
          const [
            renderPublishDatePicker, // eslint-disable-line no-unused-vars
            renderExpiresDatePicker,
          ] = mui.DateTimePicker.mock.calls

          await waitFor(() => {
            return renderExpiresDatePicker[0].onChange(otherMockDate)
          })
          const reRenderExpiresDatePicker = mui.DateTimePicker.mock.calls[3]
          expect(reRenderExpiresDatePicker[0].value).toEqual(otherMockDate)
        })

        it('Then I can NOT set the publish date to be later than the expires date', () => {
          const reRenderPublishedDatePicker = mui.DateTimePicker.mock.calls[2]
          expect(reRenderPublishedDatePicker[0].maxDate).toEqual(otherMockDate)
        })

        describe('And then publish', () => {
          beforeEach(() => {
            const { getByText } = editPage
            fireEvent.click(getByText('Publish'))
          })

          it('should save the page with an expires date', () => {
            expect(mockUpdatePage.mock.calls[0][0].variables.expires).toEqual(
              otherMockDate
            )
          })
        })
      })
    })
  })
})
