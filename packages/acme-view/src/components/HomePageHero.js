import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import SearchBar from 'gatsby-plugin-orion-core/src/components/SearchInput'

const useStyles = makeStyles(theme => {
  return {
    root: props => {
      return {
        backgroundImage: `url(${props.imageSrc})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: theme.palette.primary.main,
        maxWidth: '1440px',
        margin: '0 auto',
        '& > .MuiGrid-item': {
          flex: 1,
          padding: '24vh 0',
        },
        '& > .MuiGrid-item > .MuiGrid-item': {
          maxWidth: '40%',
          margin: '0 auto',
          '& > .MuiGrid-item ~ .MuiGrid-item': {
            width: '400px',
          },
        },
        '& .MuiTypography-h1': {
          color: theme.palette.common.white,
          fontSize: 60,
          lineHeight: 1.03,
          textAlign: 'center',
        },
        '& .MuiTypography-h3': {
          color: theme.palette.common.white,
          textAlign: 'center',
          marginBottom: 24,
          padding: '0 20%',
          fontFamily: theme.typography.fontFamily,
        },
      }
    },
  }
})

const HomePageHero = ({ imageSrc }) => {
  const classes = useStyles({ imageSrc })
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
      m="auto"
    >
      <Grid item>
        <Grid
          container
          item
          alignItems="center"
          justify="center"
          direction="column"
        >
          <Grid item>
            <Typography gutterBottom variant="h1" color="secondary">
              Accelerating the insurance industry
            </Typography>
            <Typography gutterBottom variant="h3" color="secondary">
              The new accelerator for insurance from the team who brought you
              Orion
            </Typography>
          </Grid>
          <Grid item>
            <SearchBar placeholderText="Search Acme" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default HomePageHero
