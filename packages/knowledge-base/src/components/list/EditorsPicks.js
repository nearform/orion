import React from 'react'
import { Typography } from '@material-ui/core'
import { useQuery } from 'graphql-hooks'
import { getRandomRows } from '../../utils/array'
import { getEditorsPicks } from '../../queries'
import FeatureArticles from './FeatureArticles'

function EditorsPicks() {
  const { loading, data = {} } = useQuery(getEditorsPicks)

  if (loading) return <Typography>Loading...</Typography>

  const { editors_picks: editorPicks = [] } = data

  return (
    <FeatureArticles
      hideEmpty
      title="Editor's Picks"
      articles={getRandomRows(editorPicks, 3)}
      align="flex-start"
    />
  )
}

export default EditorsPicks
