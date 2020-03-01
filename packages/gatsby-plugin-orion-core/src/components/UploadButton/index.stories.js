import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'

import UploadButton from '.'

storiesOf('UploadButton', module)
  .addDecorator(jsxDecorator)
  .add('default', () => (
    <div>
      <UploadButton
        startIcon={<AddPhotoAlternateIcon />}
        variant="contained"
        color="secondary"
      >
        Upload Image
      </UploadButton>
      <UploadButton
        startIcon={<AddPhotoAlternateIcon />}
        variant="contained"
        color="primary"
      >
        Upload Image
      </UploadButton>
    </div>
  ))
