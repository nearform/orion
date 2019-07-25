import React from 'react'
import PropTypes from 'prop-types'
import { Router, Redirect } from '@reach/router'
import { PaddedContainer } from 'components'
import CreateArticle from '../CreateArticle'
import EditArticle from './EditArticle'

import ArticleList from './ArticleList'
import EditorsPicks from './EditorsPicks'

const MyContentRoute = () => {
  return (
    <PaddedContainer>
      <Router>
        <ArticleList path="/all-stories" />
        <ArticleList path="/needs-review" />
        <CreateArticle path="/add" />
        <EditArticle path="/edit/:articleId" />
        <EditorsPicks path="/editors-picks" />
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
