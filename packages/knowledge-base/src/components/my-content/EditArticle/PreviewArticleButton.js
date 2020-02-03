import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { navigate } from 'gatsby'

const PreviewArticleButton = ({ articleId, dirty, submitForm }) => {
  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={async () => {
        try {
          if (dirty) {
            await submitForm()
          }

          navigate(`/my-content/preview/${articleId}`)
        } catch (error) {
          console.error('Unable to save article:', error)
        }
      }}
    >
      Preview Article
    </Button>
  )
}

PreviewArticleButton.propTypes = {
  articleId: PropTypes.string.isRequired,
  dirty: PropTypes.bool,
  submitForm: PropTypes.func.isRequired,
}

export default PreviewArticleButton
