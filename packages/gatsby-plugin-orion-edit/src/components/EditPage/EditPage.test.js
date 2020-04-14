/* eslint-disable camelcase, max-nested-callbacks */
import React from 'react'
import produce from 'immer' // eslint-disable-line import/no-named-as-default
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import theme from 'gatsby-theme-acme'
import { render, fireEvent, waitFor } from '@testing-library/react'
import EditPage, { reducer } from '.'
import { useMutation, useQuery } from 'graphql-hooks'
import { useLocation } from '@reach/router'
import * as mui from '@material-ui/pickers'

jest.spyOn(mui, 'DateTimePicker')

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

jest.mock('../../queries/create-page.graphql', () => 'mockCreatePageMutation')
jest.mock('../../queries/update-page.graphql', () => 'mockUpdatePageMutation')
jest.mock('graphql-hooks')
useQuery.mockReturnValue({
  data: null,
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
  layout: 'article',
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
  it('handles updates to the settings', () => {
    const payload = produce(mockInitialState, draft => {
      draft.title = 'something different'
      draft.show_in_menu = true
      draft.path = '/else/where'
      draft.layout = 'section'
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
      {
        autoOk: true,
        ampm: false,
        InputProps: {
          className: expect.stringContaining('makeStyles-input-'),
        },
        KeyboardButtonProps: { 'aria-label': 'change date' },
        emptyLabel: 'Now',
        format: 'MMM dd yyyy, hh:mm a',
        mask: 'now',
        onChange: expect.any(Function),
        orientation: 'portrait',
        value: null,
        variant: 'inline',
      },
      {}
    )
  })

  describe('When I am editing an unpublished page', () => {
    it('the date picker should show the text "now"', () => {
      const { getByDisplayValue } = renderPage()
      expect(getByDisplayValue('Now')).toBeInTheDocument()
    })
    describe('And I click on the publish button', () => {
      it('should save the page with all data and a publish date of now', () => {
        const { getByText } = renderPage()
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
            layout: 'article',
            path: '/latest-news/legal',
            published: mockDate,
            showInMenu: false,
            tags: [{ page_id: 23, tag_id: 'test-tag' }],
            title: 'Legal requirements',
          },
        })
      })
    })
    describe('And I select a publish date from the date picker and click the publish button', () => {
      beforeEach(async () => {
        const { getByText } = renderPage()

        await waitFor(() => {
          return mui.DateTimePicker.mock.calls[0][0].onChange(otherMockDate)
        })
        expect(mui.DateTimePicker.mock.calls[1][0].value).toEqual(otherMockDate)
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
            layout: 'article',
            path: '/latest-news/legal',
            published: mockDate,
            showInMenu: false,
            tags: [{ page_id: 23, tag_id: 'test-tag' }],
            title: 'Legal requirements',
          },
        })
      })
    })
    describe('And I select a publish date from the date picker and click the publish button', () => {
      beforeEach(async () => {
        const { getByText } = editPage

        await waitFor(() => {
          return mui.DateTimePicker.mock.calls[0][0].onChange(otherMockDate)
        })
        expect(mui.DateTimePicker.mock.calls[1][0].value).toEqual(otherMockDate)
        fireEvent.click(getByText('Publish'))
      })
      it('should save the page with all data and a publish date selected', () => {
        expect(mockUpdatePage.mock.calls[0][0].variables.published).toEqual(
          otherMockDate
        )
      })
    })
  })
})
