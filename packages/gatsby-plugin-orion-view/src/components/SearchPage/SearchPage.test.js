import React from 'react'
import { render, cleanup } from '@testing-library/react'
import SearchPage, { getContents } from '.'
import { useQuery } from 'graphql-hooks'
import { useViewComponents } from '../ViewComponentProvider'

const results = [
  { id: 14, title: 'About', path: '/about' },
  {
    id: 22,
    title: 'A discussion about insurability',
    path: '/latest-news/insurability',
    contents: [
      {
        block: 'content',
        component: 'ArticleContent',
        id: 37,
        props: {
          image:
            'https://s3-eu-west-1.amazonaws.com/orion-assets.nearform.com/public/default/place-2%402x.png',
          content:
            'Risk which can be insured by private companies typically shares seven common characteristics:↵↵1. Large number of similar exposure units',
        },
      },
    ],
  },
  {
    id: 3,
    title: 'Everything you need to know about insurance',
    path: '/latest-news/about-insurance',
    contents: [
      {
        block: 'content',
        component: 'ArticleContent',
        id: 86,
        props: {
          image:
            'https://res.cloudinary.com/orionacme/image/upload/v1584624711/samples/sheep.jpg',
          content:
            "This a means of protection from financial loss. It is a form of risk management, primarily used to hedge against the risk of a contingent or uncertain loss.↵↵An entity which provides insurance is as an insurer, insurance company, insurance carrier or underwriter. A person or entity who buys insurance is known as an insured or as a policyholder. The insurance transaction involves the insured assuming a guaranteed and known relatively small loss in the form of payment to the insurer in exchange for the insurer's promise to compensate the insured in the event of a covered loss. The loss may or may not be financial, but it must be reducible to financial terms, and usually involves something in which the insured has an insurable interest established by ownership, possession, or pre-existing relationship.↵↵The insured receives a contract, called the insurance policy, which details the conditions and circumstances under which the insurer will compensate the insured. The amount of money charged by the insurer to the policyholder for the coverage set forth in the insurance policy is called the premium. If the insured experiences a loss which is potentially covered by the insurance policy, the insured submits a claim to the insurer for processing by a claims adjuster. The insurer may hedge its own risk by taking out reinsurance, whereby another insurance company agrees to carry some of the risk, especially if the primary insurer deems the risk too large for it to carry.↵↵Methods for transferring or distributing risk were practiced by Chinese and Babylonian traders as long ago as the 3rd and 2nd millennia BC, respectively. Chinese merchants travelling treacherous river rapids would redistribute their wares across many vessels to limit the loss due to any single vessel's capsizing. The Babylonians developed a system which was recorded in the famous Code of Hammurabi, c. 1750 BC, and practiced by early Mediterranean sailing merchants. If a merchant received a loan to fund his shipment, he would pay the lender an additional sum in exchange for the lender's guarantee to cancel the loan should the shipment be stolen, or lost at sea.↵↵Circa 800 BC, the inhabitants of Rhodes created the 'general average'. This allowed groups of merchants to pay to insure their goods being shipped together. The collected premiums would be used to reimburse any merchant whose goods were jettisoned during transport, whether due to storm or sinkage.↵Separate insurance contracts (i.e., insurance policies not bundled with loans or other kinds of contracts) were invented in Genoa in the 14th century, as were insurance pools backed by pledges of landed estates. The first known insurance contract dates from Genoa in 1347, and in the next century maritime insurance developed widely and premiums were intuitively varied with risks. These new insurance contracts allowed insurance to be separated from investment, a separation of roles that first proved useful in marine insurance.",
          subtitle: 'This is a subtitle',
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
  },
]

jest.mock(
  'gatsby-plugin-orion-core/src/queries/base-search.graphql',
  () => 'mutation'
)

jest.mock('graphql-hooks')
useQuery.mockReturnValue({
  data: {
    results,
  },
  loading: false,
})

jest.mock('../ViewComponentProvider')
useViewComponents.mockReturnValue({
  layouts: {
    section: ({ main }) => <div>{main}</div>,
  },
})

const mockSearchTerm = 'test this'
const setupPage = ({ queryString = `?term=${mockSearchTerm}` } = {}) =>
  render(
    <SearchPage
      location={{
        pathname: '/search',
        search: queryString,
        hash: '',
        href: 'http://localhost:8000/search?term=abou',
        origin: 'http://localhost:8000',
        protocol: 'http:',
        host: 'localhost:8000',
        hostname: 'localhost',
        port: '8000',
        state: null,
        key: 'initial',
      }}
      pageContext={{
        page: {
          layout: 'section',
        },
      }}
    />
  )

describe('SearchPage component', () => {
  it('shows a title with the search term', () => {
    const { getByText } = setupPage()
    const regexp = new RegExp(mockSearchTerm)
    expect(getByText(regexp)).toBeInTheDocument()
  })

  it('correctly takes the search term from the query string', () => {
    const cases = [
      `?term=${mockSearchTerm}`,
      `?abc=123&term=${mockSearchTerm}`,
      `?term=${mockSearchTerm}&abc=123`,
      `?term2=stuff&term=${mockSearchTerm}&abc=123`,
    ]
    cases.forEach(queryString => {
      const { getByText } = setupPage({ queryString })
      const regexp = new RegExp(mockSearchTerm)
      expect(getByText(regexp)).toBeInTheDocument()
      cleanup()
    })
  })

  it('shows the no results text when there are no results', () => {
    useQuery.mockReturnValueOnce({
      data: {
        results: [],
      },
      loading: false,
    })
    const { getByText } = setupPage()
    expect(
      getByText('No pages or articles matched the given search parameters.')
    ).toBeInTheDocument()
  })

  it('shows the correct number of results', () => {
    const { container } = setupPage()
    expect(container.querySelectorAll('article').length).toEqual(3)
  })

  it('shows the results in rows', () => {
    const { container } = setupPage()
    expect(container.querySelector('article')).toHaveAttribute(
      'class',
      expect.stringMatching(
        /MuiGrid-root makeStyles-root-\d{2,} MuiGrid-container MuiGrid-spacing-xs-3 MuiGrid-item MuiGrid-grid-xs-12/
      )
    )
    expect(container.querySelector('article')).not.toHaveAttribute(
      'class',
      expect.stringMatching(
        /MuiGrid-root makeStyles-root-\d{2,} MuiGrid-container MuiGrid-item MuiGrid-direction-xs-column MuiGrid-grid-xs-12 MuiGrid-grid-sm-12/
      )
    )
    expect(container.querySelector('article')).not.toHaveAttribute(
      'class',
      expect.stringMatching(
        /MuiGrid-root makeStyles-root-\d{2,} MuiGrid-container MuiGrid-item/
      )
    )
  })

  it('shows a default image for the result when no images is available', () => {
    const { container } = setupPage()
    expect(
      container
        .querySelectorAll('article')[0]
        .querySelector('.MuiCardMedia-root')
    ).toMatchInlineSnapshot(`
      <div
        class="MuiCardMedia-root"
        style="background-image: url(/place-8@2x.png);"
        title="About"
      />
    `)
  })
  it('shows the images for the result', () => {
    const { container } = setupPage()
    const article2Img = container
      .querySelectorAll('article')[1]
      .querySelector('.MuiCardMedia-root')
    expect(article2Img).toHaveAttribute(
      'title',
      'A discussion about insurability'
    )
    expect(article2Img).toHaveAttribute(
      'style',
      'background-image: url(https://s3-eu-west-1.amazonaws.com/orion-assets.nearform.com/public/default/place-2%402x.png);'
    )
    const article3Img = container
      .querySelectorAll('article')[2]
      .querySelector('.MuiCardMedia-root')
    expect(article3Img).toHaveAttribute(
      'title',
      'Everything you need to know about insurance'
    )
    expect(article3Img).toHaveAttribute(
      'style',
      'background-image: url(https://res.cloudinary.com/orionacme/image/upload/v1584624711/samples/sheep.jpg);'
    )
  })

  it('shows a summary when one is available', () => {
    const { getByText } = setupPage()
    expect(
      getByText(
        'When a company insures an individual entity, there are basic legal requirements and regulations.'
      )
    ).toBeInTheDocument()
  })

  describe('the getContents helper', () => {
    it('returns the fallback of an empty string if there is no options arg passed in', () => {
      expect(getContents()).toEqual('')
    })
    it('returns the fallback of an empty string if no contents are passed in', () => {
      expect(getContents({ value: 'a', block: 'b' })).toEqual('')
    })
    it('returns the fallback of an empty string if no block is passed in', () => {
      expect(getContents({ value: 'a', contents: [{}] })).toEqual('')
    })
    it('returns the fallback of an empty string if no value is passed in', () => {
      expect(getContents({ block: 'a', contents: [{}] })).toEqual('')
    })
  })
})
