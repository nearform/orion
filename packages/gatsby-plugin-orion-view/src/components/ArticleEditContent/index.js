import React from 'react'
import { Button } from '@material-ui/core'

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
    // TODO Submit component below with the 3 buttons when available
    SubmitComponent={({ disabled, ...props }) => (
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={disabled}
        {...props}
      >
        Create article
      </Button>
    )}
    // TODO: change below to handle submit
    // eslint-disable-next-line no-alert
    onSubmit={e => alert(JSON.stringify(e, null, 2))}
  />
)

export default UserLogin
