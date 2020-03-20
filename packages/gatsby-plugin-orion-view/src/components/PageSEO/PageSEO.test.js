import React from 'react'
import PageSEO from '.'
import { render } from '@testing-library/react'
import { Helmet } from 'react-helmet'

describe('Page component', () => {
  it('adds meta date to the head based on the data', () => {
    const props = {
      content: "Some content. It's very long.",
      canonicalHref: 'http://localhost:8000/about',
      title: 'About',
    }
    render(<PageSEO {...props} />)
    const helmet = Helmet.peek()
    expect(helmet.linkTags).toEqual([
      {
        href: 'http://localhost:8000/about',
        rel: 'canonical',
      },
    ])
    expect(helmet.metaTags).toEqual([
      {
        content: 'Some content.',
        name: 'description',
      },
    ])
    expect(helmet.title.join('')).toEqual('About | Acme')
  })
})
