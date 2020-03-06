import React from 'react'
import ArticleList from 'gatsby-plugin-orion-core/src/components/ArticleList'

const mockArticles = [
  {
    id: '1',
    image: 'https://picsum.photos/600/335',
    title:
      '2020 sparks a year of new innovations for Orion and their user base',
    summary:
      'Insurance is a means of protection from financial loss. It is a form of risk management, primarily used to hedge against the risk of a contingent or uncertain loss.',
    path: '/latest-news/3-sample-article',
    published: '2020-02-17',
  },
  {
    id: '2',
    image: 'https://placeimg.com/600/335/arch',
    title:
      'New features and products coming soon for Orion customers and clients',
    summary:
      'An entity which provides insurance is known as an insurer, insurance company, insurance carrier or underwriter. Orion has the insurance answers for their clients. An entity which provides insurance is known as an insurer, insurance company, insurance carrier or underwriter. Orion has the insurance answers for their clients.. ',
    path: '/latest-news/3-sample-article',
    published: '2020-01-17',
  },
  {
    id: '3',
    image: 'https://loremflickr.com/600/335',
    title:
      'Twenty Twenty vision - What can we learn from the last twenty years',
    summary:
      'The insured receives a contract, called the insurance policy, which details the conditions and circumstances under which the insurer will compensate the insured.',
    path: '/latest-news/3-sample-article',
    published: '2019-12-14',
  },
  {
    id: '3',
    image: 'https://loremflickr.com/600/335',
    title:
      'Twenty Twenty vision - What can we learn from the last twenty years',
    summary:
      'The insured receives a contract, called the insurance policy, which details the conditions and circumstances under which the insurer will compensate the insured.',
    path: '/latest-news/3-sample-article',
    published: '2019-12-14',
  },
  {
    id: '3',
    image: 'https://loremflickr.com/600/335',
    title:
      'Twenty Twenty vision - What can we learn from the last twenty years',
    summary:
      'The insured receives a contract, called the insurance policy, which details the conditions and circumstances under which the insurer will compensate the insured.',
    path: '/latest-news/3-sample-article',
    published: '2019-12-14',
  },
]

export default function({
  title,
  withFeatured,
  suppressImage,
  suppressSummary,
  clipImage,
  type,
}) {
  return (
    <ArticleList
      articles={mockArticles}
      title={title}
      type={type}
      options={{
        withFeatured,
        suppressImage,
        suppressSummary,
        clipImage,
      }}
    />
  )
}
