import React from 'react'
import layouts from 'acme-view/src/layouts'
import { makeStyles } from '@material-ui/core'

export default {
  blocks: ['summary', 'content', 'metadata'],
  editor: layouts.article,
  example: React.Fragment,
  name: 'Simple article',
}
