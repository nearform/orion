import React from 'react'
import { Router, Redirect } from '@reach/router' // eslint-disable-line import/no-extraneous-dependencies

import CreateArticle from './CreateArticle'
import EditArticle from './EditArticle'
import ArticleList from './ArticleList'
import EditorsPicks from './EditorsPicks'
import PreviewArticle from './PreviewArticle'

const MyContentRoute = () => {
  return (
    <Router>
      <ArticleList path="/all-stories" />
      <ArticleList path="/needs-review" />
      <CreateArticle path="/add" />
      <PreviewArticle path="/preview/:articleId" />
      <EditArticle path="/edit/:articleId" />
      <EditorsPicks path="/editors-picks" />
      <Redirect
        default
        noThrow
        from="/my-content"
        to="/my-content/all-stories"
      />
    </Router>
  )
}

MyContentRoute.propTypes = {}

export default MyContentRoute
