import React from 'react'
import T from 'prop-types'
import { Button, withStyles } from '@material-ui/core'

const UploadButton = ({ onFileSelected, classes }) => (
  <>
    <input
      accept="*/*"
      id="outlined-button-file"
      type="file"
      className={classes.hiddenInput}
      onChange={event => onFileSelected(event.target.files[0])}
    />
    <label htmlFor="outlined-button-file">
      <Button variant="outlined" color="secondary" component="span">
        Upload
      </Button>
    </label>
  </>
)

UploadButton.propTypes = {
  onFileSelected: T.func.isRequired,
}

const styles = {
  hiddenInput: {
    display: 'none',
  },
}

export default withStyles(styles)(UploadButton)
