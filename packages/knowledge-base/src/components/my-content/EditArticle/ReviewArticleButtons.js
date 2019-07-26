import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core'

const ReviewArticleButtons = ({ publishArticle }) => {
  const [publishModalOpen, setPublishModalOpen] = useState(false)
  return (
    <>
      <Grid item xs={6}>
        <Button variant="outlined" color="secondary" type="submit">
          Save
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setPublishModalOpen(true)}
        >
          Publish
        </Button>
        <Dialog
          open={publishModalOpen}
          onClose={() => setPublishModalOpen(false)}
        >
          <DialogTitle id="alert-dialog-title">
            {'Publish Article?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once published the article will be visible to all.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setPublishModalOpen(false)}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                publishArticle()
                setPublishModalOpen(false)
              }}
              color="primary"
            >
              Publish
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  )
}

ReviewArticleButtons.propTypes = {
  publishArticle: PropTypes.func,
}

export default ReviewArticleButtons
