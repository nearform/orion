import React from 'react'
import get from 'lodash/get'
import { useQuery } from 'graphql-hooks'
import { getRandomRows } from '../../utils/array'
import ThemedList from './ThemedList'
import ListTitle from './ListTitle'
import { getEditorsPicks } from '../../queries'
import { withStyles, Grid } from '@material-ui/core'

function PersonalizedLists({ classes }) {
  const { data: editorsPicksData } = useQuery(getEditorsPicks)

  //TODO: nicer loading indication
  if (!editorsPicksData) return null

  const editorsPicks =
    editorsPicksData.editors_picks.length > 3
      ? getRandomRows(editorsPicksData.editors_picks, 3)
      : editorsPicksData.editors_picks

  return (
    <Grid item container spacing={3} direction="row">
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} md={3} lg={2}>
          <ListTitle title="Just for you" />
        </Grid>
        <ThemedList
          hideEmpty
          title="Last Read"
          articles={get({ editors_picks: editorsPicks }, 'editors_picks', [])}
        />
        <ThemedList
          hideEmpty
          title="Bookmarked Articles"
          articles={get({ editors_picks: editorsPicks }, 'editors_picks', [])}
        />
        <Grid item xs={12} md={3} sm={4}>
          <div
            className={classes.promoImage}
            style={{
              backgroundImage: undefined,
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

const styles = theme => ({
  root: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('lg')]: {
      // Align edge of boxes with article text
      marginLeft: theme.spacing(-3),
    },
  },
  promoImage: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.light,
    backgroundPosition: 'left',
    backgroundSize: 'cover',
  },
})

export default withStyles(styles)(PersonalizedLists)
