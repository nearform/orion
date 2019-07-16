import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Router, Redirect } from '@reach/router'
import { PaddedContainer } from 'components'
import SEO from '../SEO'

import ContentToolbar from './ContentToolbar'

import ArticleList from './ArticleList'

const MyContentRoute = () => {
  const [pageTitle, setPageTitle] = useState('')

  return (
    <PaddedContainer>
      <SEO title={`${pageTitle} - My Content`} />
      <ContentToolbar pageTitle="Content" />
      <Router>
        <ArticleList path="/all-stories" setPageTitle={setPageTitle} />
        <ArticleList path="/needs-review" setPageTitle={setPageTitle} />
        <Redirect
          default
          noThrow
          from="/my-content"
          to="/my-content/all-stories"
        />
      </Router>
    </PaddedContainer>
  )
}

MyContentRoute.propTypes = {
  classes: PropTypes.object,
}

export default MyContentRoute
