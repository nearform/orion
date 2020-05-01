import React from 'react'
import T from 'prop-types'
import PaddedContainer from 'gatsby-plugin-orion-core/src/components/PaddedContainer'
import { Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4, 0),
  },
}))

function PageLayout({ content, metadata }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <PaddedContainer>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            {metadata}
          </Grid>
          <Grid item xs={7}>
            {content}
          </Grid>
        </Grid>
      </PaddedContainer>
    </div>
  )
}

PageLayout.propTypes = {
  content: T.node.isRequired,
  metadata: T.node.isRequired,
}

export default PageLayout
