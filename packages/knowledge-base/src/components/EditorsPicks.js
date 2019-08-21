import React from 'react'
import get from 'lodash/get'
import { useQuery } from 'graphql-hooks'
import { getRandomRows } from '../utils/array'
import FeatureArticles from '../components/FeatureArticles'
import { getEditorsPicks } from '../queries'
import { Grid } from '@material-ui/core'

function EditorsPicks() {
  const { data: editorsPicksData } = useQuery(getEditorsPicks)

  //TODO: nicer loading indication
  if (!editorsPicksData) return null

  const editorsPicks =
    editorsPicksData.editors_picks.length > 3
      ? getRandomRows(editorsPicksData.editors_picks, 3)
      : editorsPicksData.editors_picks

  return (
    <Grid item container spacing={3} direction="row">
      <FeatureArticles
        hideEmpty
        title="Editor's Picks"
        articles={get({ editors_picks: editorsPicks }, 'editors_picks', [])}
      />
    </Grid>
  )
}

export default EditorsPicks
