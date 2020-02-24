import React from 'react'
import { Grid, Button, Typography } from '@material-ui/core'

import { Form } from 'gatsby-plugin-orion-core'

const UserLogin = () => (
  <Form
    formFields={[
      {
        placeholder: 'Add Title',
        name: 'title',
        type: 'text',
        inputTypographyVariant: 'h1',
      },
      {
        placeholder: 'Add Subtitle',
        name: 'subtitle',
        type: 'text',
        inputTypographyVariant: 'h2',
      },
      {
        name: 'image',
        type: 'image',
      },
      {
        label: 'Article Summary',
        name: 'article_summary',
        type: 'text',
        rows: 5,
        multiline: true,
      },
      {
        label: 'Article Content',
        name: 'article_content',
        type: 'text',
        rows: 20,
        multiline: true,
      },
    ]}
    SubmitComponent={({ disabled, ...props }) => (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        {...props}
      >
        <Grid>
          <Typography noWrap variant="h6" color="textSecondary">
            Have an account? <a>Sign in</a>
          </Typography>
        </Grid>
        <Grid>&nbsp;</Grid>
        <Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={disabled}
          >
            Create account
          </Button>
        </Grid>
      </Grid>
    )}
    // TODO: change below to handle submit
    // eslint-disable-next-line no-alert
    onSubmit={e => alert(JSON.stringify(e, null, 2))}
  />
)

export default UserLogin
