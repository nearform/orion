import React from 'react'
import T from 'prop-types'
import PaddedContainer from 'gatsby-plugin-orion-core/src/components/PaddedContainer'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  section: {
    padding: 32,
    '&:nth-child(2)': {
      backgroundColor: theme.palette.background.dark,
      '& .MuiCard-root': {
        backgroundColor: theme.palette.background.dark,
      },
    },
  },
}))

function HomeLayout({ hero, one, two, three, four }) {
  const classes = useStyles()

  return (
    <>
      <div>{hero}</div>
      <div className={classes.content}>
        <div className={classes.section}>
          <PaddedContainer>{one}</PaddedContainer>
        </div>
        <div className={classes.section}>
          <PaddedContainer>{two}</PaddedContainer>
        </div>
        <div className={classes.section}>
          <PaddedContainer>{three}</PaddedContainer>
        </div>
        <div className={classes.section}>
          <PaddedContainer>{four}</PaddedContainer>
        </div>
      </div>
    </>
  )
}

HomeLayout.propTypes = {
  hero: T.node.isRequired,
  one: T.node.isRequired,
  two: T.node.isRequired,
  three: T.node.isRequired,
  four: T.node.isRequired,
}

export default HomeLayout
