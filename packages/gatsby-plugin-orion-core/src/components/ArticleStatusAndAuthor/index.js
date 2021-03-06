import React from 'react'
import T from 'prop-types'
import { Grid, Typography } from '@material-ui/core'
import ArticleStatusChip from '../ArticleStatusChip'

const Form = ({ author, articleStatus }) => (
  <Grid container spacing={2} justify="flex-start">
    <Grid item xs={2}>
      <Typography variant="h6">Status</Typography>
    </Grid>
    <Grid item xs={10}>
      <ArticleStatusChip status={articleStatus} />
    </Grid>
    {author && (
      <>
        <Grid item xs={2}>
          <Typography variant="h6">Author</Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body">{author}</Typography>
        </Grid>
      </>
    )}
  </Grid>
)

Form.propTypes = {
  articleStatus: T.oneOf(['in-progress', 'in-review', 'published', 'hidden']),
  author: T.string,
}

Form.defaultProps = {
  articleStatus: 'in-progress',
  author: '',
}

export default Form
