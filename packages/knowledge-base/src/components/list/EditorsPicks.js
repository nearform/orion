import React from 'react'
import { Typography } from '@material-ui/core'
import { useQuery } from 'graphql-hooks'
import { getRandomRows } from '../../utils/array'
import FeatureArticles from './FeatureArticles'
import { getEditorsPicks } from '../../queries'

function EditorsPicks() {
  const { loading, data = {} } = useQuery(getEditorsPicks)

  if (loading) return <Typography>Loading...</Typography>

  const { editors_picks = [] } = data

  return (
    <FeatureArticles
      hideEmpty
      title="Editor's Picks"
      articles={getRandomRows(editors_picks, 3)}
      align="flex-start"
    />
  )
}

export default EditorsPicks
