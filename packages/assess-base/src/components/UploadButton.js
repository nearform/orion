import React from 'react'
import T from 'prop-types'
import classnames from 'classnames'
import { Button, withStyles } from '@material-ui/core'

const UploadButton = ({
  onFileSelected,
  classes,
  id,
  grow,
  ...buttonProps
}) => {
  const handleChange = event => onFileSelected(event.target.files[0])
  return (
    <>
      <input
        accept="*/*"
        id={id}
        type="file"
        className={classes.hiddenInput}
        onChange={handleChange}
      />
      <label htmlFor={id} className={classnames({ [classes.grow]: grow })}>
        <Button component="span" {...buttonProps} />
      </label>
    </>
  )
}

UploadButton.defaultProps = {
  id: 'outlined-button-file',
  grow: false,
}

UploadButton.propTypes = {
  onFileSelected: T.func.isRequired,
  id: T.string,
  grow: T.bool,
}

const styles = {
  hiddenInput: {
    display: 'none',
  },
  grow: {
    flexGrow: 1,
  },
}

export default withStyles(styles)(UploadButton)
