import React from 'react'
import { Grid } from '@material-ui/core'

function Content({ pageContext: { content } }) {
  return (
    <Grid container>
      <Grid item xs>
        <pre>
          {JSON.stringify(content, null, 4)}
        </pre>
      </Grid>
    </Grid>
  )
}

export default Content
