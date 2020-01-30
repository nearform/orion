import React from 'react'
import { Button, Grid } from '@material-ui/core'

const PublishedArticleButtons = () => {
  return (
    <Grid item xs={12}>
      <Button variant="outlined" color="secondary" type="submit">
        Save
      </Button>
    </Grid>
  )
}

PublishedArticleButtons.propTypes = {}

export default PublishedArticleButtons
