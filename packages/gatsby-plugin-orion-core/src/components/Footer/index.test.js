import React from 'react'
import { render } from '@testing-library/react'
import Footer from '.'

// Prevent errors loading the reach router Links
jest.mock(`@reach/router/lib/utils`)

test('Renders social media icon links', async () => {
  expect.assertions(3)

  const socialIcons = [
    {
      logo: 'linkedin',
      url: 'https://www.linkedin.com/company/nearform',
    },
    {
      logo: 'twitter',
      url: 'https://twitter.com/NearForm',
    },
    {
      logo: 'youtube',
      url: 'https://www.youtube.com/channel/UCp2Tsb',
    },
  ]

  const { getByTestId } = render(
    <Footer
      socialIcons={socialIcons}
      Img={({ ...props }) => <img {...props} />}
    />
  )
  const link1 = getByTestId('https://www.linkedin.com/company/nearform')
  const link2 = getByTestId('https://twitter.com/NearForm')
  const link3 = getByTestId('https://www.youtube.com/channel/UCp2Tsb')

  expect(link1).toBeInTheDocument()
  expect(link2).toBeInTheDocument()
  expect(link3).toBeInTheDocument()
})
