import React from 'react'
import { Typography } from '@material-ui/core'
import { useQuery } from 'graphql-hooks'
import { getRandomRows } from 'gatsby-plugin-orion-core/utils'
import { getEditorsPicks } from 'gatsby-plugin-orion-core/queries'
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
