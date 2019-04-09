import React from 'react'
import styled from 'styled-components'
import { boxShadow } from 'saluki'

import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

import Grid from '.'

const Item = styled.div`
  ${boxShadow('page')}
  height: 10rem;
`

storiesOf('System/Blocks/Grid', module)
  .addDecorator(jsxDecorator)
  .add('Basic Page with 12 cols', () => (
    <Grid container gutter={20}>
      <Grid item span={1}>
        <Item />
      </Grid>
      <Grid item span={1} style={{ marginBottom: '20px' }}>
        <Item />
      </Grid>
      <Grid item span={1}>
        <Item />
      </Grid>
      <Grid item span={1}>
        <Item />
      </Grid>
      <Grid item span={1}>
        <Item />
      </Grid>
      <Grid item span={1}>
        <Item />
      </Grid>
      <Grid item span={1}>
        <Item />
      </Grid>
      <Grid item span={1}>
        <Item />
      </Grid>
      <Grid item span={1}>
        <Item />
      </Grid>
      <Grid item span={1}>
        <Item />
      </Grid>
      <Grid item span={1}>
        <Item />
      </Grid>
      <Grid item span={1}>
        <Item />
      </Grid>
    </Grid>
  ))
  .add('Basic Page with 7 cols', () => (
    <Grid container gutter={20}>
      <Grid item span={1}>
        <Item />
      </Grid>
      <Grid item span={1}>
        <Item />
      </Grid>
      <Grid item span={1}>
        <Item />
      </Grid>
      <Grid item span={1}>
        <Item />
      </Grid>
      <Grid item span={1}>
        <Item />
      </Grid>
      <Grid item span={1}>
        <Item />
      </Grid>
      <Grid item span={1}>
        <Item />
      </Grid>
    </Grid>
  ))
  .add('Basic Page with 7 2/3/2 cols', () => (
    <Grid container gutter={20}>
      <Grid item span={2}>
        <Item />
      </Grid>
      <Grid item span={3}>
        <Item />
      </Grid>
      <Grid item span={2}>
        <Item />
      </Grid>
    </Grid>
  ))
  .add('Basic Page with 7 2/3/2 cols and custom style passed in', () => (
    <Grid container gutter={20}>
      <Grid item span={2}>
        <Item />
      </Grid>
      <Grid item span={3} style={{ marginBottom: '2rem' }}>
        <Item />
      </Grid>
      <Grid item span={2}>
        <Item />
      </Grid>
    </Grid>
  ))
