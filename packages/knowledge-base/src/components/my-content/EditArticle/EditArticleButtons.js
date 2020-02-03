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

const EditArticleButtons = ({ submitArticle }) => {
  const [submitModalOpen, setSubmitModalOpen] = useState(false)
  return (
    <>
      <Grid item xs={6}>
        <Button variant="outlined" color="secondary" type="submit">
          Save Draft
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setSubmitModalOpen(true)}
        >
          Submit
        </Button>
        <Dialog
          open={submitModalOpen}
          onClose={() => setSubmitModalOpen(false)}
        >
          <DialogTitle id="alert-dialog-title">
            Submit Article For Review?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              After submitting the article to be reviewed you will no longer be
              able to edit it.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={() => setSubmitModalOpen(false)}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => {
                submitArticle()
                setSubmitModalOpen(false)
              }}
            >
              Submit for review
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  )
}

EditArticleButtons.propTypes = {
  submitArticle: PropTypes.func,
}

export default EditArticleButtons
