import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid } from '@material-ui/core'

const PublishedArticleButtons = ({ publishArticle }) => {
  return (
    <Grid item xs={12}>
      <Button variant="outlined" color="secondary" type="submit">
        Save
      </Button>
    </Grid>
  )
}

PublishedArticleButtons.propTypes = {
  publishArticle: PropTypes.func,
}

export default PublishedArticleButtons
