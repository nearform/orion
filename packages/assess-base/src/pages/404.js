import React from 'react'

import { SEO } from 'components'

// TODO: Replace this with a basically-styled 404
// and move it to components package

export default function NotFoundPage() {
  return (
    <>
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist.</p>
    </>
  )
}
