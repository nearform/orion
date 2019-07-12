import React, { useState } from 'react'
import { Router } from '@reach/router'
import ProtectedRoute from '../components/ProtectedRoute'
import SEO from '../components/SEO'
import CreateArticle from '../components/CreateArticle'
import EditArticle from '../components/EditArticle'
import { PaddedContainer } from 'components'

function SubmitSection({
  component: SubmitComponent,
  applyPageTitle,
  ...props
}) {
  applyPageTitle(props)
  return <SubmitComponent {...props} />
}

function SubmitRoutes(props) {
  const [pageTitle, setPageTitle] = useState('')

  return (
    <PaddedContainer>
      <SEO title={pageTitle} />
      <Router>
        <SubmitSection
          path="/"
          component={CreateArticle}
          applyPageTitle={() => setPageTitle('Create Article')}
        />
        <SubmitSection
          path=":articleId"
          component={EditArticle}
          applyPageTitle={() => setPageTitle('Edit Article')}
        />
      </Router>
    </PaddedContainer>
  )
}
export default function Submit() {
  return (
    <Router basepath="/submit">
      <ProtectedRoute requiresGroup component={SubmitRoutes} path="*" />
    </Router>
  )
}
