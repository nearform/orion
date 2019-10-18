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
  const editorsPicks =
    editors_picks.length > 3 ? getRandomRows(editors_picks, 3) : editors_picks

  return (
    <FeatureArticles
      hideEmpty
      title="Editor's Picks"
      articles={editorsPicks}
      align="flex-start"
    />
  )
}

export default EditorsPicks
