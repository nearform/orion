import React from 'react'
import T from 'prop-types'
import { Button, Grid } from '@material-ui/core'

const ArticleEditButtons = ({
  onSave,
  onSettings,
}) => (
  <Grid container spacing={2}>
    <Grid item>
      <Button variant="contained" color="secondary" onClick={onSettings}>
        Page settings
      </Button>
    </Grid>
    <Grid item>
      <Button variant="contained" color="primary" onClick={onSave}>
        Save
      </Button>
    </Grid>
  </Grid>
)

ArticleEditButtons.propTypes = {
  onSave: T.func,
  onSettings: T.func,
}

export default ArticleEditButtons
