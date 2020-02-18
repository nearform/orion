import React from 'react'
import { Link } from '@reach/router'
import { useQuery } from 'graphql-hooks'
import getArticlesQuery from '../queries/get-articles.graphql'

function Home({ pageContext: { articles } }) {
  const { data, loading } = useQuery(getArticlesQuery)

  return (
    <ul>
      {(loading ? articles : data.orion_content).map(article => (
        <li key={article.id}>
          <Link to={article.path}>{article.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Home
