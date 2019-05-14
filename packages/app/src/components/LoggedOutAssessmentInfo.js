import React from 'react'
import { Button, Grid, Typography, withTheme } from '@material-ui/core'

import ImagePlaceholder from './ImagePlaceholder'
import SectionTitle from '../components/SectionTitle'

function LoggedOutAssessmentInfo({ theme }) {
  return (
    <Grid container spacing={theme.spacing.unit * 4}>
      <Grid item xs={3}>
        <SectionTitle barColor={theme.palette.primary.dark}>
          The EFQM Model 2020
        </SectionTitle>
      </Grid>
      <Grid item xs={5}>
        <ImagePlaceholder>
          <Typography variant="h4">Pic of Model 2020</Typography>
        </ImagePlaceholder>
      </Grid>
      <Grid item xs={4}>
        <Typography gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          interdum sapien et ipsum pellentesque, ut fringilla eros scelerisque.
          Mauris ex ex, viverra pharetra cursus gravida, vulputate ac velit.
          Donec nec tempus nulla. Curabitur scelerisque tincidunt diam a
          blandit. Nunc convallis, orci vitae dapibus luctus, tellus erat
          lacinia justo, et lacinia ipsum risus egestas arcu. Morbi quis
          consequat odio. Suspendisse at mi nunc. Vivamus tempor urna justo,
          vitae ullamcorper ex maximus quis.
        </Typography>
        <Grid container>
          <Grid item xs={6}>
            <Button color="secondary" variant="outlined" fullWidth>
              Find Out More
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withTheme()(LoggedOutAssessmentInfo)
