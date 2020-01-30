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
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Unable to save article:', e)
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
