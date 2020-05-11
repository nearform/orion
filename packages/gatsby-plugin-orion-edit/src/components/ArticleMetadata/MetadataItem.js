import React from 'react'

import { Grid, TextField } from '@material-ui/core'

const MetadataItem = props => {
  const handler = e => {
    props.handleChange(props.index, {
      ...props.item,
      [`${e.target.name}`]: e.target.value,
    })
  }

  return (
    <Grid container spacing={4}>
      <Grid container item>
        <Grid item xs={3}>
          <label htmlFor={props.item.name}>{props.item.label}</label>
        </Grid>
        <Grid item xs={9}>
          <TextField
            fullWidth
            id={props.item.name}
            placeholder={props.item.name}
            name="value"
            value={props.item.value}
            multiline={props.item.multiline}
            rows={props.item.multiline ? 8 : 1}
            onChange={handler}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MetadataItem
